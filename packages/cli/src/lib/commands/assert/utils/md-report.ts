import { FractionResults, GatherMode, ReducedFlowStep, ReducedReport } from '../../collect/utils/report/types';
import { enrichReducedReportWithBaseline } from '../../collect/utils/report/utils';
import { Alignment, table } from '../../../core/md/table';
import { style } from '../../../core/md/font-style';
import { headline, Hierarchy } from '../../../core/md/headline';
import { NEW_LINE } from '../../../core/md/constants';
import { details } from '../../../core/md/details';

const budgetsSymbol = '🔒'

export function generateMdReport(flowResult: ReducedReport): string {
  const name = flowResult.name;
  const dateTime = `Date/Time: ${style(new Date().toISOString().replace('T', ' ').split('.')[0].slice(0, -3))}  `;
  const settings = `View-port: ${style(flowResult.configSettings.viewPort)}, Network: ${style('fast 3G' + ' throttling')}, CPU: ${style(flowResult.configSettings.cpu + 'x throttling')}`;
  const stepsTable = getStepsTable(flowResult);

  let md = `${headline(name)}${NEW_LINE}
${dateTime}${NEW_LINE}
${settings}${NEW_LINE}
${stepsTable}${NEW_LINE}
`;

  const budgetsTable = getBudgetTable(flowResult);
  if(budgetsTable !== '') {
    md += details(`${budgetsSymbol} Budgets`, budgetsTable) + NEW_LINE;
  }

  return md;
}

/**
 * ## Navigation report (127.0.0.1/)
 *
 * | Resource Type | Requests | Transfer Size | Over Budget |
 * | :-----------: | :------: | :-----------: | :---------: |
 * |     Total     |  205774  |     total     |   204750    |
 * |    Script     |  101958  |    script     |      -      |
 * |  Third-party  |  97308   |  third-party  |      -      |
 *
 * |         Metric         | Measurement | Over Budget |
 * | :--------------------: | :---------: | :---------: |
 * | First Meaningful Paint |    2043     |     43      |
 * |  Time to Interactive   |    4745     |      -      |
 *
 */
export function getBudgetTable(reducedReport: ReducedReport, options: {heading: Hierarchy} = {heading: 3}): string {
  const performanceBudgets = reducedReport.steps
    .filter(({ resultsPerformanceBudget, resultsTimingBudget }) => resultsPerformanceBudget || resultsTimingBudget)
    .map(({ name, resultsPerformanceBudget, resultsTimingBudget }) => ({
        name,
        resultsPerformanceBudget: resultsPerformanceBudget !== undefined ? [
          resultsPerformanceBudget.headings
            .map((h) => h.text as string),
          ...resultsPerformanceBudget.items.map(
            ({label, transferSize, requestCount, sizeOverBudget, countOverBudget}) =>
            [label, requestCount, formatBytes(transferSize as number), sizeOverBudget ? formatBytes(sizeOverBudget as number) : '-', countOverBudget || '-'] as (string|number)[]) || []
        ] : [],
        resultsTimingBudget: resultsTimingBudget !== undefined ? [
          resultsTimingBudget.headings.map(h => h.text as string),
          ...resultsTimingBudget.items.map(({label, measurement, overBudget}) =>
            [label, measurement + ' ms', overBudget ? `${overBudget} ms` : '-'] as (string|number)[]) || []
        ] : []
      })
    );
  return performanceBudgets.length ? performanceBudgets.map(b => {
    let md = headline(b.name, options.heading) + NEW_LINE + NEW_LINE;
    if(b.resultsPerformanceBudget !== undefined) {
      md += style('Resource Budget') + NEW_LINE+ NEW_LINE;
      md += table(b.resultsPerformanceBudget) + NEW_LINE + NEW_LINE
    }
    if(b.resultsTimingBudget !== undefined) {
      md += style('Timing Budget') + NEW_LINE+ NEW_LINE;
      md += (b.resultsPerformanceBudget ? NEW_LINE : '') + table(b.resultsTimingBudget) + NEW_LINE;
    }
    return md;
  }).join(NEW_LINE) : '';
}


/**
 * | Step Name       | Gather Mode |Performance | Accessibility | BestPractices | Seo  | PWA |
 * | --------------- | ----------- | ------------- | ------------- | ---- | --- |
 * |  Nav1           |  99         | 50            | 100           | 98   |  -  |
 * |  Snap   1       |  3/3        | 22/5          | 5/2           | 7/10 |  -  |
 * |  TimeSpan 1     |  10/11      | -             | 4/7           | 7/10 |  -  |
 */
export function getStepsTable(reducedReport: ReducedReport, baselineResults?: any): string {
  const reportCategories = Object.keys(reducedReport.steps[0].results);
  const tableStepsArr = formatStepsForMdTable(reportCategories, reducedReport, baselineResults);
  const alignOptions = headerAlignment(reportCategories);
  const tableArr = extractTableArr(reportCategories, tableStepsArr);
  return table(tableArr, alignOptions);
}

function formatStepsForMdTable(reportCategories: string[], reducedReport: ReducedReport, baselineResults?: any): string[][] {
  if (baselineResults) {
    const enrichedReducedReport = enrichReducedReportWithBaseline(reducedReport, baselineResults);
    return enrichedReducedReport.steps.map((step) => {
      const results = reportCategories.map(category => extractEnrichedResults(step, category));
      return [step.name, step.gatherMode].concat(results);
    });
  }
  return reducedReport.steps.map((step) => {
    const results = reportCategories.map(category => extractResultsValue(step.results[category]));
    // add `budgetsSymbol` to gatherMode to indicate budgets
    step.resultsPerformanceBudget && (step.gatherMode = step.gatherMode + ` ${budgetsSymbol}` as GatherMode);
    return [step.name, step.gatherMode].concat(results);
  });
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function extractTableArr(reportCategories: string[], steps: any[]): string[][] {
  const tableHead = extractTableHead(reportCategories);
  return [tableHead].concat(steps);
}

function extractTableHead(reportCategories: string[]): string[] {
  return ['Step Name', 'Gather Mode']
    .concat(reportCategories.map(c => c.split('-').map(cN => cN[0].toUpperCase() + cN.slice(1)).join(' ')));
}

function extractFractionalResultValue(fractionResults: FractionResults): string {
  const { totalWeight, numPassed, numPassableAudits } = fractionResults;
  const value = numPassed + '/' + numPassableAudits;
  return totalWeight === 0 ? 'Ø ' + value : value;
}

function extractResultsValue(stepResult?: number | FractionResults): string {
  if (typeof stepResult === 'number') {
    return (stepResult * 100).toFixed(0);
  }
  return stepResult ? extractFractionalResultValue(stepResult) : '-';
}

function extractEnrichedResults(step: ReducedFlowStep, category: string): string {
  const result = extractResultsValue(step.results[category]);
  const baseline = extractResultsValue(step.baseline![category]);
  return resultWithBaselineComparison(result, baseline);
}

function resultWithBaselineComparison(result: string, baseline: string): string {
  if (result === baseline) {
    return result;
  }
  const resultNum = Number(result.replace('Ø ', '').split('/')[0]);
  const baselineNum = Number(baseline.replace('Ø ', '').split('/')[0]);
  const difference = baselineNum - resultNum;
  return `${result} (${difference > 0 ? '+' : ''}${difference})`;
}

function headerAlignment(reportCategories: string[]): Alignment[] {
  const reportFormats = reportCategories.map(_ => 'c');
  return ['l', 'c'].concat(reportFormats) as Alignment[];
}


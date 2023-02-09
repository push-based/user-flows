import { NEW_LINE } from '../../../../core/md/constants';
import { headline } from '../../../../core/md/headline';
import { style } from '../../../../core/md/font-style';
import { ReducedReport } from '../report/types';
import { userFlowReportToMdTable } from '../../../assert/utils/md-report';

export function generateStdoutReport(flowResult: ReducedReport): string {
  const dateTime = new Date().toISOString().replace('T', ' ').split('.')[0].slice(0, -3);
  const mdTable = userFlowReportToMdTable(flowResult);
  return `# ${flowResult.name}\n\nDate/Time: ${dateTime}\n\n${mdTable}`;
}

export function generateMdReport(flowResult: ReducedReport): string {
  const name = flowResult.name;
  const dateTime = `Date/Time: ${style(new Date().toISOString().replace('T', ' ').split('.')[0].slice(0, -3))}  `;
  const mdTable = userFlowReportToMdTable(flowResult);

  return `${headline(name)}${NEW_LINE}
${dateTime}${NEW_LINE}
${mdTable}`;
}

export function dateToIsoLikeString(date: Date): string {
  return isoDateStringToIsoLikeString(date.toISOString());
}
export function isoDateStringToIsoLikeString(isoDate: string): string {
  return isoDate.replace(/[\-:]/gm, '').split('.').shift() as string;
}


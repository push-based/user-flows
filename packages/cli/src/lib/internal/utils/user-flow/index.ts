import { readdirSync } from 'fs';
// @ts-ignore
import { startFlow, UserFlow } from 'lighthouse/lighthouse-core/fraggle-rock/api';

import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import {
  UserFlowProvider,
  UserFlowMock
} from '../../../types/model';
import { resolveAnyFile, toFileName, writeFile } from '../file';
import { join, normalize } from 'path';
import { logVerbose } from '../../../core/loggin';
import { get as dryRun } from '../../../core/options/dryRun';
import { PersistOptions } from '../../config/model';
import { detectCliMode } from '../../../cli-modes';
import { DEFAULT_ASSERT_BUDGET_PATH } from '../../config/constants';
import { readBudgets } from '../budgets';

type PersistFn = (cfg: Pick<PersistOptions, 'outPath'> & { flow: UserFlow, name: string }) => Promise<string>;

const _persistMethod = new Map<string, PersistFn>();

_persistMethod.set('html', async ({ outPath, flow, name }) => {
  const report = await flow.generateReport();
  const fileName = join(outPath, `${toFileName(name)}.uf.html`);
  writeFile(fileName, report);
  return fileName;
});

_persistMethod.set('json', async ({ outPath, flow, name }) => {
    const report = await flow.createFlowResult();
    const fileName = join(outPath, `${toFileName(name)}.uf.json`);
    writeFile(fileName, JSON.stringify(report));
    return fileName;
  }
);

export async function persistFlow(flow: UserFlow, name: string, { outPath, format }: PersistOptions): Promise<string[]> {
  // @Notice: there might be a bug in user flow and Promise's
  return Promise.all(format.map((f: string) => (_persistMethod.get(f) as any)({ flow, name, outPath })));
}

export async function collectFlow(
  cliOption: { url: string, dryRun: boolean },
  userFlowProvider: UserFlowProvider & { path: string }
) {
  let {
    launchOptions,
    // object containing the LH setting for budgets
    flowOptions,
    interactions
  } = userFlowProvider;

  // object containing the options for pupeteer/chromium
  launchOptions = launchOptions || {
    headless: false,
    defaultViewport: { isMobile: true, isLandscape: false, width: 800, height: 600 }
  };
  // @TODO consider CI vs dev mode => headless, open, persist etc

  if (detectCliMode() !== 'DEFAULT') {
    logVerbose(`Set headless to true as we are running in ${detectCliMode()} mode`);
    launchOptions.headless = true;
  }

  logVerbose(`Collect: ${flowOptions.name} from URL ${cliOption.url}`);
  logVerbose(`File path: ${normalize(userFlowProvider.path)}`);
  let start = Date.now();

  // setup ppt, and start flow
  logVerbose(`launchOptions: ${JSON.stringify(launchOptions)}`);
  const browser: Browser = await puppeteer.launch(launchOptions);
  const page: Page = await browser.newPage();

  console.log('flowOptions');
  console.table(flowOptions);
  if (flowOptions?.config === undefined)
    flowOptions.config = {
      settings: {
        budgets: []
      }
    };

  if (flowOptions.config?.settings === undefined)
    flowOptions.config.settings = {
      budgets: []
    };

  console.log('flowOptions after');
  console.table(flowOptions);

  flowOptions.config.settings.budgets = readBudgets(DEFAULT_ASSERT_BUDGET_PATH);

  const flow: UserFlow = !dryRun() ? await startFlow(page, flowOptions) : new UserFlowMock(page, flowOptions);

  // run custom interactions
  await interactions({ flow, page, browser, collectOptions: cliOption });
  logVerbose(`Duration: ${flowOptions.name}: ${(Date.now() - start) / 1000}`);
  await browser.close();

  return flow;
}

export function loadFlow(path: string): ({ exports: UserFlowProvider, path: string })[] {
  let ufDirectory = [];
  try {
    ufDirectory = readdirSync(path);
  } catch (e) {
    throw new Error(`ufPath: ${path} is no directory`);
  }
  const flows = readdirSync(path).map((p) => resolveAnyFile<UserFlowProvider & { path: string }>(join(path, p)));
  return flows;
}


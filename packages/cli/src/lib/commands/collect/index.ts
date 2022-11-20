import { YargsCommandObject } from '../../core/yargs/types';
import { logVerbose } from '../../core/loggin/index';
import { COLLECT_OPTIONS } from './options';
import { startServerIfNeededAndExecute } from './utils/serve-command';
import { collectRcJson } from '../init/processes/collect-rc-json';
import { run } from '../../core/processing/behaviors';
import { collectReports } from './processes/collect-reports';
import { RcJson } from '../../types';
import { getCollectCommandOptionsFromArgv } from './utils/params';

export const collectUserFlowsCommand: YargsCommandObject = {
  command: 'collect',
  description: 'Run a set of user flows and save the result',
  builder: (y) => y.options(COLLECT_OPTIONS),
  module: {
    handler: async (argv: any) => {
      logVerbose(`run "collect" as a yargs command with args:`);
      const cfg = getCollectCommandOptionsFromArgv(argv);
      logVerbose('Collect options: ', cfg, argv);
      await run([
        collectRcJson,
        (cfg: RcJson) =>
          startServerIfNeededAndExecute(() => collectReports(cfg), cfg.collect)
      ])(cfg);
    }
  }
};

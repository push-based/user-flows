import { ExecFn, Project, ProjectConfig } from '@push-based/cli-testing';
import { CLI_MODES, CollectCommandArgv, GlobalOptionsArgv, InitCommandArgv, RcJson } from '@push-based/user-flow';

export type UserFlowProject = Project & {
  $init: ExecFn<Partial<InitCommandArgv & GlobalOptionsArgv>>,
  $collect: ExecFn<Partial<CollectCommandArgv & GlobalOptionsArgv>>,
  readRcJson: (name: string) => string
}

export type UserFlowProjectConfig = ProjectConfig<RcJson> & UserFlowOnlyProjectConfig;
export type UserFlowOnlyProjectConfig = {
  cliMode?: CLI_MODES,
  serveCommandPort?: number
}

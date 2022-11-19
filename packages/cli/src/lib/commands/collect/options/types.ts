import { Param as OpenReport } from './openReport.model';
import { Param as UfPath } from './ufPath.model';
import { Param as Url } from './url.model';
import { Param as ServeCommand } from './serveCommand.model';
import { Param as AwaitServeStdout } from './awaitServeStdout.model';
import { Param as OutPath } from './outPath.model';
import { Param as Format } from './format.model';
import { AssertOptions } from '../../assert/options/types';
import { YargsArgvOptionFromParamsOptions } from '../../../core/yargs/types';

export type PersistYargsOptions = OpenReport & OutPath & Format;
export type CollectYargsOptions = UfPath & OutPath & Url & ServeCommand & AwaitServeStdout & AssertOptions;
export type CollectArgvOptions = YargsArgvOptionFromParamsOptions<CollectYargsOptions & PersistYargsOptions>;

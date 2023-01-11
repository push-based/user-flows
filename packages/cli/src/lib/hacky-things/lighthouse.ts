/*
* NOTICE:
*
* As long as we did bot solve the import problem we will isolate this hack here to not pollute our codebase with `@ts-ignore`.
*
* */

// @ts-ignore
import { default as LhConfig } from 'lighthouse/types/config';
export type LhConfigJson = LhConfig.Json;

// @ts-ignore
export {Util} from 'lighthouse/lighthouse-core/util-commonjs';
// @ts-ignore
export { startFlow, UserFlow } from 'lighthouse/lighthouse-core/fraggle-rock/api';

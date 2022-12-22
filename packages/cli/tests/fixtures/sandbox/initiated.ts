import { UserFlowProjectConfig, SANDBOX_BASE_RC_JSON } from '@push-based/user-flow-cli-testing';
import { DEFAULT_RC_NAME } from '../../../src/lib/constants';
import { join } from 'path';
import { BASIC_NAVIGATION_USERFLOW_CONTENT, BASIC_NAVIGATION_USERFLOW_NAME } from '../user-flows/initialized.uf';
import { EMPTY_SANDBOX_BIN } from './empty';

export const INITIATED_PRJ_NAME = 'sandbox-setup';
export const INITIATED_PRJ_ROOT = join(__dirname, '..', '..', '..', '..', INITIATED_PRJ_NAME);
export const INITIATED_PRJ_BIN = EMPTY_SANDBOX_BIN;

export const INITIATED_PRJ_CFG: UserFlowProjectConfig = {
  root: INITIATED_PRJ_ROOT,
  bin: INITIATED_PRJ_BIN,
  rcFile: {
    [DEFAULT_RC_NAME]: SANDBOX_BASE_RC_JSON
  },
  create: {
    [SANDBOX_BASE_RC_JSON.collect.ufPath]: undefined,
    [SANDBOX_BASE_RC_JSON.persist.outPath]: undefined,
    [join(SANDBOX_BASE_RC_JSON.collect.ufPath, BASIC_NAVIGATION_USERFLOW_NAME)]: BASIC_NAVIGATION_USERFLOW_CONTENT
  }
};

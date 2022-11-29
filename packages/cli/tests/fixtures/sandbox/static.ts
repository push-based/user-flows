import { UserFlowProjectConfig } from '../../utils/cli-testing/user-flow-cli-project/types';
import { DEFAULT_RC_NAME } from '../../../src/lib/constants';
import { STATIC_RC_JSON, STATIC_USERFLOW_PATH } from '../rc-files/static';
import { STATIC_USERFLOW_CONTENT } from '../user-flows/static.uf';
import { INITIATED_PRJ_BIN, INITIATED_PRJ_ROOT } from './initiated';

// @TODO add static-app files to serve
export const STATIC_PRJ_CFG: UserFlowProjectConfig = {
  root: INITIATED_PRJ_ROOT,
  bin: INITIATED_PRJ_BIN,
  rcFile: {
    [DEFAULT_RC_NAME]: STATIC_RC_JSON
  },
  create: {
    [STATIC_RC_JSON.collect.ufPath]: undefined,
    [STATIC_RC_JSON.persist.outPath]: undefined,
    [STATIC_USERFLOW_PATH]: STATIC_USERFLOW_CONTENT
  }
};

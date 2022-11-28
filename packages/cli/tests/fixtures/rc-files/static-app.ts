import { RcJson } from '../../../src/lib';
import { SANDBOX_BASE_RC_JSON } from '../../utils/cli-testing/user-flow-cli-project/data/user-flowrc.base';
import { SERVE_COMMAND_PORT } from '../../utils/cli-testing/user-flow-cli-project/constants';

export const STATIC_RC_NAME = '.user-flow.static.json';
export const STATIC_RC_JSON: RcJson = {
  ...SANDBOX_BASE_RC_JSON,
  'collect': {
    'url': 'http://127.0.0.1:' + SERVE_COMMAND_PORT,
    'ufPath': './src/lib/user-flows-static-dist',
    'serveCommand': 'npm run start',
    'awaitServeStdout': 'Available on:'
  },
  persist: {
    ...SANDBOX_BASE_RC_JSON.persist,
    'format': ['json']
  }
};

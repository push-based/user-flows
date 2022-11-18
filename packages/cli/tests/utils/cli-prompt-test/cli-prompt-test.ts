import * as _cliPromptTest from 'cli-prompts-test';
import { CI_PROPERTY } from '../../../src/lib/global/cli-mode/cli-mode';
import { CLI_MODES } from '../../../src/lib/global/cli-mode/types';

/**
 * @param {string[]} args CLI args to pass in
 * @param {string[]} answers answers to be passed to stdout
 * @param {Object} [options] specify the testPath and timeout
 *
 * returns {Promise<Object>}
 */
export function cliPromptTest(args, answers, options, cliMode?: CLI_MODES) {
  const _cliMode: CLI_MODES = cliMode || 'SANDBOX';
  if(_cliMode === 'DEFAULT') {
    delete process.env[CI_PROPERTY];
  }
  else if(_cliMode === 'SANDBOX') {
    // emulate sandbox env by setting CI to SANDBOX
    process.env[CI_PROPERTY] = 'SANDBOX';
  }
  // CI mode
  else {
    process.env[CI_PROPERTY] = 'true';
  }
  return _cliPromptTest(args, answers, options);
}

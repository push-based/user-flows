import * as _cliPromptTest from 'cli-prompts-test';
import { CI_PROPERTY, getCliMode } from '../../src/lib/global/cli-mode/cli-mode';


/**
 * @param {string[]} args CLI args to pass in
 * @param {string[]} answers answers to be passed to stdout
 * @param {Object} [options] specify the testPath and timeout
 *
 * returns {Promise<Object>}
 */
export function cliPromptTest(args, answers, options) {
  // emulate sandbox env by setting CI to SANDBOX
  process.env[CI_PROPERTY] = 'SANDBOX';
  return _cliPromptTest(args, answers, options);
}

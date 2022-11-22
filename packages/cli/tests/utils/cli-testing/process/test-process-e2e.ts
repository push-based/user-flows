import * as concat from 'concat-stream';
import * as execa from 'execa';
import { ExecaChildProcess, Options } from 'execa';
import { PromptTestOptions } from './types';

/**
 * A function to control a process and its in and outputs.
 * Starts a node process with a given configuration Takes parameters
 *
 * @param args
 * parameters passed to the process
 * @param answers
 * values to be passed to process
 * @param options
 * specify the process configuration
 * @param promptOptions
 * specify the process configuration
 */
export function testProcessE2e(args?: string[], answers: string[] = [], options: Options = {}, promptOptions: PromptTestOptions = {}): Promise<ExecaChildProcess> {
  // Defaults to process.cwd()

  // Timeout between each keystroke simulation
  const timeout = promptOptions && promptOptions.timeout ? promptOptions.timeout : 500;

  const runner: any = execa('node', args, options) as any;
  runner.stdin.setDefaultEncoding('utf-8');

  const writeToStdin = (answers) => {
    if (answers.length > 0) {
      setTimeout(() => {
        runner.stdin.write(answers[0]);
        writeToStdin(answers.slice(1));
      }, timeout);
    } else {
      runner.stdin.end();
    }
  };

  // Simulate user input (keystrokes)
  writeToStdin(answers);

  return new Promise((resolve) => {
    let obj: ExecaChildProcess = {} as unknown as ExecaChildProcess;

    runner.stdout.pipe(
      concat((result) => {
        obj.stdout = result.toString();
      })
    );

    runner.stderr.pipe(
      concat((result) => {
        obj.stderr = result.toString();
      })
    );

    runner.on('exit', (exitCode) => {
      (obj as unknown as any).exitCode = exitCode;
      resolve(obj);
    });
  });
};

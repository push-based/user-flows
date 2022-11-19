import { UserFlowProvider } from './types';
import { join } from 'path';
import { existsSync, lstatSync, readdirSync } from 'fs';
import { resolveAnyFile } from '../../../../core/file';
import { CollectRcOptions } from '../../options/types';

export function loadFlow(collect: CollectRcOptions): ({ exports: UserFlowProvider, path: string })[] {
  const { ufPath } = collect;
  const path = join(process.cwd(), ufPath);
  if (!existsSync(path)) {
    throw new Error(`ufPath: ${path} is no directory`);
  }

  let files: string[];
  if (lstatSync(path).isDirectory()) {
    files = readdirSync(path).map(file => join(path, file));
  } else {
    files = [path];
  }

  const flows = files.filter(f => f.endsWith('js') || f.endsWith('ts'))
    .map((file) => resolveAnyFile<UserFlowProvider & { path: string }>(file));

  if (flows.length === 0) {
    // @TODO use const for error msg
    throw new Error(`No user flows found in ${ufPath}`);
  }
  return flows;
}

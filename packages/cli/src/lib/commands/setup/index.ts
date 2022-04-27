import { get as interactive } from '../../core/options/interactive';
import { prompt } from 'enquirer';
import { REPORT_FORMAT_OPTIONS, REPORT_FORMAT_VALUES } from '../collect/constats';
import { mkdirSync, readdirSync } from 'fs';
import { RcJson } from '@push-based/user-flow/cli';
import { DEFAULT_COLLECT_UF_PATH } from '../collect/options/ufPath.constant';
import { DEFAULT_PERSIST_OUT_PATH } from '../collect/options/outPath.constant';
import { DEFAULT_COLLECT_URL } from '../collect/options/url.constant';

export async function ensureOutPath(
  config: RcJson
): Promise<RcJson> {

    let suggestion = config?.persist?.outPath || DEFAULT_PERSIST_OUT_PATH;
  if (interactive()) {
    const { outPath } = await prompt<{ outPath: string }>([
      {
        type: 'input',
        name: 'outPath',
        message: 'What is the directory to store results in?',
        initial: suggestion,
        skip: !!config?.persist?.outPath
      }
    ]);
    suggestion = outPath;
  }

  // Check if path for output is given
  if (!suggestion) {
    throw new Error('Path to output folder is required. Either through the console as `--outPath` or in the `.user-flowrc.json`');
  }

  return {
    ...config,
    persist: { ...config?.persist, outPath: suggestion }
  };
}

export async function ensureUfPath(
  config: RcJson
): Promise<RcJson> {
  let suggestion = config?.collect?.ufPath || DEFAULT_COLLECT_UF_PATH;
  if (interactive()) {
    const { ufPath } = await prompt<{ ufPath: string }>([
      {
        type: 'input',
        name: 'ufPath',
        message: 'Folder of the user flows?',
        initial: suggestion,
        skip: !!config?.collect?.ufPath
      }
    ]);
    suggestion = ufPath;
  }

  // Check if path to user-flows is given
  if (!suggestion) {
    throw new Error('Path to user flows is required. Either through the console as `--ufPath` or in the `.user-flowrc.json`');
  }

  try {
    readdirSync(suggestion);
  } catch (e) {
    mkdirSync(suggestion)
  }

  return {
    ...config,
    collect: { ...config?.collect, ufPath: suggestion }
  };
}

export async function ensureUrl(
  config: RcJson
): Promise<RcJson> {

  let suggestion = config?.collect?.url ? config?.collect?.url?.trim() : undefined;

  if (interactive()) {
    suggestion = suggestion || DEFAULT_COLLECT_URL;
    const { url } = await prompt<{ url: string }>([
      {
        type: 'input',
        name: 'url',
        message: 'What is the URL to run the user flows for?',
        initial: suggestion,
        skip: suggestion !== ''
      }
    ]);

    suggestion = url || suggestion;
  }

  // Validate

  // Check if url is given
  if (suggestion === '' || suggestion === undefined) {
    throw new Error('URL is required. Either through the console as `--url` or in the `.user-flow.json`');
  }


  return {
    ...config,
    collect: { ...config?.collect, url: suggestion }
  };
}


/**
 * Takes the provided value form the cfg and evaluates it.
 * if CLI is interative it checks the given format and prompts the user if the value is not given
 * @param config
 */
export async function ensureFormat(
  config: RcJson
): Promise<RcJson> {
  let suggestion: string[] = [];

  let cfgFormat: string[] = [];
  if(config?.persist?.format) {
    cfgFormat = Array.isArray(config.persist.format) ? config.persist.format : [config.persist.format];
  }

  if (cfgFormat.length === 0) {
    suggestion = REPORT_FORMAT_VALUES;
  } else {
    suggestion = cfgFormat;
  }

  if (interactive()) {

    const { format }: { format: string[] | undefined } = cfgFormat.length === 0 ? await prompt<{ format: string[] }>([
      {
        type: 'multiselect',
        name: 'format',
        message: 'What is the format of user-flow reports? (use ⬇/⬆ to navigate, and SPACE key to select)',
        choices: REPORT_FORMAT_OPTIONS,
        // @NOTICE typing is broken here
        result(value: string): string {
          const values = value as any as string[];
          return values.map(name => REPORT_FORMAT_OPTIONS.find(i => i.name === name)?.value + '') as any as string;
        }
      }
    ]) : { format: cfgFormat };

    suggestion = format;
    if (suggestion.length === 0) {
      return ensureFormat(config);
    }
  }

  // Validate
  // Check if format is given
  if (!suggestion) {
    throw new Error('format is required. Either through the console as `--format` or in the `.user-flow.json`');
  }

  suggestion.forEach((val) => {
    if(!REPORT_FORMAT_VALUES.find(i => i === val)) {
      throw new Error(`Wrong format "${val}" format has to be one of: ${REPORT_FORMAT_VALUES.join(', ')}`);
    }
  })

  return {
    ...config,
    persist: { ...config?.persist, format: suggestion }
  };
}

import {getWorkspaceLayout, logger, Tree, updateJson, writeJson} from "@nrwl/devkit";
import {TargetGeneratorSchema} from "./schema";
import {join} from "path";
import {NormalizedSchema} from "./types";

export function normalizeOptions(tree: Tree, options?: TargetGeneratorSchema): NormalizedSchema {

  const projectName = options.projectName;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectName}`;

  return {
    ...options,
    projectName,
    projectRoot
  };
}

export function setupUserFlow(tree: Tree, cfg: NormalizedSchema): void {
  const {projectName, targetName, projectRoot, verbose} = cfg;
  logger.log(`Adding .user-flowrc.json to project`);
  writeJson(tree, join(projectRoot, '.user-flowrc.json'), {
    collect: {},
    persist: {}
  });
}

export function addTarget(tree: Tree, cfg: NormalizedSchema) {
  const {projectName, targetName, projectRoot, url} = cfg;
  logger.log(`Adding target ${targetName} to project ${projectName}`);
  updateJson(tree, join(projectRoot, 'project.json'), (json) => {
    if (json.targets[targetName] !== undefined) {
      throw new Error(`Target ${targetName} already exists`)
    }
    json.targets[targetName] = {
      "executor": "@user-flow/plugin-user-flow:user-flow",
      "outputs": ["{options.outputPath}"],
      "options": {
        "url": url,
        "rcPath": `${projectRoot}/.user-flowrc.json`,
        "ufPath": `${projectRoot}/user-flows`,
        "outputPath": `dist/user-flow/${projectName}`,
        "format": ["md"]
      }
    };
    return json;
  });
}

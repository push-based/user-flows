import {readdirSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

console.log(`Reame results for comment action`);
const path = 'dist/user-flow/user-flow-gh-integration';
const reportPath = readdirSync(path)[0];
if (!reportPath) {
  throw new Error('Report file not found');
}
const targetPath = join(path, reportPath);
const destPath = join(path, 'md-report.md');
let report = readFileSync(targetPath, {encoding: 'utf8'});
report = `
❗❗❗ **report generated by this PR** ❗❗❗
---

` + report;
writeFileSync(destPath, report);
console.log(`Report ${targetPath} renamed to ${destPath}`);

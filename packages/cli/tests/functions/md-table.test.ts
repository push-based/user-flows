import * as LHR9 from '../data/lhr-9.json';
import * as LHR9REDUCED from '../data/lhr-9_reduced.json';
import * as LHR8 from '../data/lhr-8.json';
import { userFlowReportToMdTable } from '../../src/lib/commands/assert/processes/md-table';
import { reduce } from 'rxjs';
import { createReducedReport } from '../../src/lib/commands/collect/processes/generate-reports';

const lhr8 = LHR8 as any;
const lhr9 = LHR9 as any;
const lhr9reduced = LHR9REDUCED as any;

describe('md-table', () => {

  it('should throw if version is lower than 9', () => {
    expect(LHR8['steps']).toBe(undefined);
    expect(parseFloat(lhr8.lhr.lighthouseVersion)).toBeLessThan(9);
  });

  it('should NOT throw if version is greater or equal than 9', () => {
    expect(parseFloat(lhr9.steps[0].lhr.lighthouseVersion)).toBeGreaterThan(9);
  });

  it('should generate reduced JSON format for v9 raw JSON result', () => {
    const reducedLhr9 = createReducedReport(lhr9);
    expect(reducedLhr9).toEqual(lhr9reduced);
  });

});

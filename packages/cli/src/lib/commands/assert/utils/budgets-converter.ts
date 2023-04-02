/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

'use strict';

import { Assertions, BaseOptions } from './types';
import Budget from 'lighthouse/types/lhr/budget';
import exp from 'constants';

export function convertPathExpressionToRegExp(path?: string) {
  if (!path || path === '/') return /.*/;
  const escapedPath = path
    .split('*')
    .map(part => part.replace(/([-[\]{}()*+?.,\\^|#\s])/g, '\\$1'))
    .join('.*');
  return new RegExp(`https?://[^/]+${escapedPath}`);
}

/**
 * @param {Array<LHCI.AssertCommand.Budget>} budgets
 * @return {LHCI.AssertCommand.Options}
 */
export function convertBudgetsToAssertions(budgets: Budget[]) {
  // @ts-ignore - .d.ts files no yet shipped with lighthouse
  const Budget = require('lighthouse/lighthouse-core/config/budget.js');
  // Normalize the definition using built-in Lighthouse validation.
  budgets = Budget.initializeBudget(budgets);

  const assertMatrix: BaseOptions[] = [];

  for (const budget of budgets) {

    const assertions: Assertions = {};

    for (const {metric, budget: maxNumericValue} of budget.timings || []) {
      assertions[metric] = ['error', {maxNumericValue}];
    }

    for (const {resourceType, budget: maxNumericValue} of budget.resourceCounts || []) {
      assertions[`resource-summary:${resourceType}:count`] = ['error', {maxNumericValue}];
    }

    for (const {resourceType, budget: maxNumericValue} of budget.resourceSizes || []) {
      assertions[`resource-summary:${resourceType}:size`] = [
        'error',
        {maxNumericValue: maxNumericValue * 1024},
      ];
    }

    assertMatrix.push({
      matchingUrlPattern: convertPathExpressionToRegExp(budget.path || '').source,
      assertions,
    });
  }

  return {assertMatrix};
}

module.exports = {convertPathExpressionToRegExp, convertBudgetsToAssertions};

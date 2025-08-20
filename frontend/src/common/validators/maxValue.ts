import {
  maxValue as _maxValue,
  helpers,
} from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';

export function maxValue(max: number): ValidationRuleWithParams {
  return helpers.withMessage(({
    $params,
  }) => {
    return `Значение не должно превышать ${$params.max}`;
  }, helpers.withParams({
    max,
  }, _maxValue(max)));
}

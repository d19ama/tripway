import {
  maxLength as _maxLength,
  helpers,
} from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';

export function maxLength(max: number): ValidationRuleWithParams {
  return helpers.withMessage(({
    $params,
  }) => {
    return `Длина строки не должна превышать ${$params.max} символов`;
  }, helpers.withParams({
    max,
  }, _maxLength(max)));
}

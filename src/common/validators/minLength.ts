import {
  helpers,
  minLength as validator,
} from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';
import { numeric } from '@/common/format';

export function minLength(min: number): ValidationRuleWithParams {
  return helpers.withMessage(({
    $params,
  }) => {
    return `Минимальное количество символов: ${numeric($params.min)}`;
  }, helpers.withParams({
    min,
  }, validator(min)));
}

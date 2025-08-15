import {
  requiredIf as _requiredIf,
  helpers,
} from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';

export function requiredIf(...params: Parameters<typeof _requiredIf>): ValidationRuleWithParams {
  return helpers.withMessage('Обязательное поле', _requiredIf(...params));
}

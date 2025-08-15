import {
  required as _required,
  helpers,
} from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';

export const required: ValidationRuleWithParams = helpers.withMessage('Обязательное поле', _required);

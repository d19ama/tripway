import {
  email as _email,
  helpers,
} from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';

export const email: ValidationRuleWithParams = helpers.withMessage('Некорректный email', _email);

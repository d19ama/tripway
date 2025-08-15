import { helpers } from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';

export const positiveNumber: ValidationRuleWithParams = helpers.withMessage('Число не может быть меньше или равно нулю', (value: string | number) => {
  return Number(value) > 0;
});

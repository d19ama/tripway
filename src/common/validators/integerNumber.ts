import { helpers } from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';

export const integerNumber: ValidationRuleWithParams = helpers.withMessage('Число должно быть целым', (value: string | number) => {
  return Number.isInteger(Number(value));
});

import { helpers } from '@vuelidate/validators';
import type { ValidationRuleWithParams } from '@vuelidate/core';

export function fractionalNumber(max: number): ValidationRuleWithParams {
  return helpers.withMessage(({
    $params,
  }) => `Не более ${$params.max} знаков после запятой`, helpers.withParams({
    max,
  }, (value: string | number) => {
    const fractionalNumber = value.toString().match(/\.(\d+)/)?.[1];

    if (fractionalNumber) {
      return Number(fractionalNumber.length) <= max;
    }

    return true;
  }));
}

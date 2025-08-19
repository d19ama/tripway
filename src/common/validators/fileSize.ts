import type { ValidationRuleWithParams } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { MAX_FILE_SIZE } from '../constants';

export function fileSize(maxFileSize: number = MAX_FILE_SIZE): ValidationRuleWithParams {
  return helpers.withMessage(({
    $params,
  }) => `Размер превышает ${$params.max}`, helpers.withParams({
    maxFileSize,
  }, (value: string | number) => {
    return Number(value) < maxFileSize;
  }));
}

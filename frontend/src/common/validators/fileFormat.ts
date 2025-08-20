import type { ValidationRuleWithParams } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';

export function fileFormat(extensions: string[]): ValidationRuleWithParams {
  return helpers.withMessage(({
    $params,
  }) => `Размер превышает ${$params.max}`, helpers.withParams({
    extensions,
  }, (value: string) => {
    const regexp: RegExp = /(?:\.([^.]+))?$/;
    const name: string = value.toLowerCase();
    const extension: RegExpExecArray | null = regexp.exec(name);

    return extension !== null
      ? extensions.includes(extension[1] as unknown as string)
      : false;
  }));
}

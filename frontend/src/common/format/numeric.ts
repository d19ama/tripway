import { isNumber } from '@sniptt/guards';
import type {
  Locale,
  RawValue,
} from './format.types';

export function numeric(value: RawValue<number>, fractions: [min?: number, max?: number] = [
  0,
  undefined,
]): string {
  if (!isNumber(value)) {
    return '';
  }

  const LOCALE: Locale = 'ru-RU';

  const [
    min,
    max,
  ] = fractions;

  const formatter = new Intl.NumberFormat(LOCALE, {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });

  return formatter.format(value);
}

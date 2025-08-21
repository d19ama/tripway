import { isNumber } from '@sniptt/guards';
import type { RawValue } from './format.types';
import { numeric } from './index';

/**
 * Число с процентом по правилам дизайн-системы.
 *
 * @example
 * ```ts
 * percentage(0); // '0%'
 * percentage(100); // '100%'
 * percentage(1000); // '1 000%'
 * percentage(1000.01); // '1 000,01%'
 * ```
 */
export function percentage(value: RawValue<number>, fractions: [min?: number, max?: number] = [
  0,
  undefined,
]) {
  if (!isNumber(value)) {
    return '';
  }

  return `${numeric(value, fractions)}%`;
}

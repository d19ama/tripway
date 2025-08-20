import { numeric } from './numeric';

/**
 * Формат числа для цены
 * @deprecated Используй format.currency
 * @param value
 * @returns
 */
export function formatPrice(value: string): string | undefined {
  const num = numeric(+value);
  const [
    val,
    ex,
  ] = num.split(',');

  if (!ex) {
    return val;
  }

  return [
    val,
    ex?.length === 1
      ? `${ex}0`
      : ex,
  ].join(',');
}

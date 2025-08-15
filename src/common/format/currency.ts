import { isNumber } from '@sniptt/guards';
import type {
  Locale,
  RawValue,
} from './format.types';

/**
 * Международный код валюты.
 */
type Currency = 'RUB'; // Расширь кодом валюты, который тебе нужен (USD, KZT и так далее)

// Расширь этот Options, но не добавляй новых параметров в функцию!
interface Options {
  currency?: Currency;
}

/**
 * Перевод из числа в валютное значение
 *
 * @param value - Число, которое нужно отформатировать
 * @param options - Международный код валюты (RUB, USD, EUR, KZT и так далее)
 * @example
 * currency(1000); // 1 000 ₽
 * currency(1000.66); // 1 000,66 ₽
 * currency(1000.6); // 1 000,60 ₽
 */
export function currency(value: RawValue<number>, options?: Options): string {
  if (!isNumber(value)) {
    return '';
  }

  const currency: Currency = options?.currency || 'RUB';

  const fraction = value % 1; // TODO Особенность 16-ной системы счисления не учтена!

  // Если есть дробная часть, то 2 знака после запятой: 1000.1 => "1 000,10 ₽"
  const minimumFractionDigits: number = fraction === 0
    ? 0
    : 2;
  const maximumFractionDigits: number = 2;

  const LOCALE: Locale = 'ru-RU';

  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

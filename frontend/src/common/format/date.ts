import {
  isDate,
  isString,
} from '@sniptt/guards';
import type {
  Locale,
  RawValue,
} from './format.types';
import { unbreakable } from './index';

type DateISO8601 = string; // 2077-12-01T10:28:05.048Z

// ВАЖНО!
// Ни в коем случае не расширять типом Dayjs!
type Value = RawValue<DateISO8601 | Date>;

type Variant = 'Long' | 'Short' | 'Numeric';

/**
 * @deprecated
 */
interface Options {
  variant?: Variant;
}

interface DateDestructured {
  day: string;
  month: string;
  year: string;
}

/**
 * Переводит дату в представление соответствующее дизайн-системе
 *
 * @param value - Дата
 *
 * @example
 * date('2077-12-01T10:28:05.048Z'); // 01.12.2077
 */
export function date(value: Value): string;

/**
 * Переводит дату в указанное представление соответствующее дизайн‑системе
 *
 * @param value - Дата
 * @param [variant] - Тип представления в соответствии с дизайн‑системой
 *
 * @example
 * date('2077-12-01T10:28:05.048Z', 'Numeric'); // 01.12.2077
 * date('2077-12-01T10:28:05.048Z', 'Long'); // 1 декабря 2077 г.
 * date('2077-12-01T10:28:05.048Z', 'Short'); // 1 дек. 2077 г.
 */
export function date(value: Value, variant: Variant): string;

/**
 * Переводит дату в указанное представление соответствующее дизайн‑системе и превращает в объект
 *
 * @param value - Дата
 * @param [variant] - Тип представления в соответствии с дизайн‑системой
 * @param [destructured] - Вернуть объект даты
 *
 * @example
 * // { day: '01', month: '12', year: '2077' }
 * date('2077-12-01T10:28:05.048Z', 'Numeric', true);
 *
 * // { day: '1', month: 'декабря', year: '2077 г.' }
 * date('2077-12-01T10:28:05.048Z', 'Long', true);
 *
 * // { day: '1', month: 'дек.', year: '2077 г.' }
 * date('2077-12-01T10:28:05.048Z', 'Short', true);
 */
export function date(value: Value, variant: Variant, destructured: false): string;

/**
 * Переводит дату в указанное представление соответствующее дизайн‑системе и превращает в объект
 *
 * @param value - Дата
 * @param [variant] - Тип представления в соответствии с дизайн‑системой
 * @param [destructured] - Вернуть объект даты
 *
 * @example
 * // { day: '01', month: '12', year: '2077' }
 * date('2077-12-01T10:28:05.048Z', 'Numeric', true);
 *
 * // { day: '1', month: 'декабря', year: '2077 г.' }
 * date('2077-12-01T10:28:05.048Z', 'Long', true);
 *
 * // { day: '1', month: 'дек.', year: '2077 г.' }
 * date('2077-12-01T10:28:05.048Z', 'Short', true);
 */
export function date(value: Value, variant: Variant, destructured: true): DateDestructured;

/**
 * Переводит дату в указанное представление соответствующее дизайн‑системе
 *
 * @param value - Дата
 * @param [destructured] - Вернуть объект даты
 *
 * @example
 * date('2077-12-01T10:28:05.048Z', false); // 01.12.2077
 */
export function date(value: Value, destructured: false): string;

/**
 * Переводит дату в указанное представление соответствующее дизайн‑системе и превращает в объект
 *
 * @param value - Дата
 * @param [destructured] - Вернуть объект даты
 *
 * @example
 * // { day: '01', month: '12', year: '2077' }
 * date('2077-12-01T10:28:05.048Z', true);
 */
export function date(value: Value, destructured: true): DateDestructured;

/**
 * Переводит дату в указанное представление соответствующее дизайн‑системе
 *
 * @param value - Дата
 * @param [variant] - Тип представления в соответствии с дизайн‑системой
 * @param [destructured] - Получить данные в виде объекта
 *
 * @example
 * date('2077-12-01T10:28:05.048Z'); // 01.12.2077
 * date('2077-12-01T10:28:05.048Z', 'Numeric'); // 01.12.2077
 * date('2077-12-01T10:28:05.048Z', 'Long'); // 1 декабря 2077 г.
 * date('2077-12-01T10:28:05.048Z', 'Short'); // 1 дек. 2077 г.
 */
export function date(
  value: Value,
  variant?: Variant,
  destructured?: boolean,
): string | DateDestructured;

export function date(
  value: Value,
  variant: Variant | boolean | Options = 'Numeric',
  destructured: boolean = false,
): string | DateDestructured {
  if (!isString(value) && !isDate(value)) {
    return '';
  }

  const LOCALE: Locale = 'ru-RU';

  const date: Date = isDate(value)
    ? value
    : new Date(value);

  const _variant: Variant = toVariant(variant);

  const VARIANT_RESOLVER: Record<Variant, Intl.DateTimeFormatOptions> = {
    Long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    Short: {
      year: 'numeric',
      // Март, Май, Июнь, Июль не сокращаются согласно постановке (номер месяца начинается с нуля, помним)
      month: [
        2,
        4,
        5,
        6,
      ].includes(date.getMonth())
        ? 'long'
        : 'short',
      day: 'numeric',
    },
    Numeric: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  };

  if (destructured || (typeof variant === 'boolean' && variant)) {
    const SPLIT_RESOLVER: Record<Variant, RegExp> = {
      Numeric: /[.]/,
      Short: /[\s]/,
      Long: /[\s]/,
    };

    const [
      day,
      month,
      ...year
    ] = date
      .toLocaleString(LOCALE, VARIANT_RESOLVER[_variant])
      .split(SPLIT_RESOLVER[_variant]);

    return {
      day: day || '',
      month: month || '',
      year: unbreakable(year), // Потому что может быть '2077 г.' вместо '2077'
    };
  }

  // Не убирать!
  // На всякий случай unbreakable, как контроль, что строку нельзя будет перенести.
  return unbreakable(date.toLocaleString(LOCALE, VARIANT_RESOLVER[_variant]));
}

// Уберется вместе с Options
function isOptions(value: any): value is Options {
  return Object.keys(value).includes('variant');
}

// Уберется вместе с Options
function toVariant(arg: Variant | boolean | Options = 'Numeric'): Variant {
  if (isOptions(arg)) {
    return arg.variant ?? 'Numeric';
  }

  if (typeof arg === 'boolean') {
    return 'Numeric';
  }

  return arg;
}

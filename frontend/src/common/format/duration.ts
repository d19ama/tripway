import {
  isNumber,
  isObject,
} from '@sniptt/guards';
import type { RawValue } from './format.types';
import {
  plural,
  unbreakable,
} from './index';

interface Duration {
  years?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

type Milliseconds = number;

type Value = Duration | Milliseconds;

type Variant = 'Long' | 'Short';

type UnitFormatRules = Record<keyof Duration, (value: number) => string>;

const PLURAL_LONG: UnitFormatRules = {
  years,
  days: (value) =>
    plural(value, {
      one: 'день',
      few: 'дня',
      many: 'дней',
    }),
  hours: (value) =>
    `${doubleDigit(value)}\xA0${
      plural(
        value,
        {
          one: 'час',
          few: 'часа',
          many: 'часов',
        },
        true,
      ).word
    }`,
  minutes: (value) =>
    `${doubleDigit(value)}\xA0${
      plural(
        value,
        {
          one: 'минута',
          few: 'минуты',
          many: 'минут',
        },
        true,
      ).word
    }`,
  seconds: (value) =>
    `${doubleDigit(value)}\xA0${
      plural(
        value,
        {
          one: 'секунда',
          few: 'секунды',
          many: 'секунд',
        },
        true,
      ).word
    }`,
  milliseconds: () => '', // Миллисекунды не отображаются
};

const PLURAL_SHORT: UnitFormatRules = {
  years, // Так и задумано, годы не сокращаются согласно поставке!
  days: (value) => `${value}\xA0дн.`,
  hours: (value) => `${doubleDigit(value)}\xA0ч.`,
  minutes: (value) => `${doubleDigit(value)}\xA0мин.`,
  seconds: (value) => `${doubleDigit(value)}\xA0сек.`,
  milliseconds: () => '', //  // Миллисекунды не отображаются
};

/**
 * Длительность без сокращений
 * @example
 * // 999 лет 365 дней 23 часа 59 минут 59 секунд
 * duration({ years: 999, days: 365, hours: 23, minutes: 59, seconds: 59 }, 'Long');
 */
export function duration(value: RawValue<Value>, variant?: 'Long'): string;
/**
 * Длительность сокращенная
 * @example
 * // 999 лет 365 дн. 23 ч. 59 мин. 59 сек.
 * duration({ years: 999, days: 365, hours: 23, minutes: 59, seconds: 59 }, 'Short');
 */
export function duration(value: RawValue<Value>, variant?: 'Short'): string;
/**
 * Длительность
 * @example
 * // 10 секунд
 * duration(10000, 'Long');
 *
 * // 10 сек.
 * duration(10000, 'Short');
 */
export function duration(value: RawValue<Milliseconds>, variant?: Variant): string;
export function duration(value: RawValue<Value>, variant: Variant = 'Long'): string {
  if (!isNumber(value) && !isObject(value)) {
    return '';
  }

  const units: Required<Value> = accumulated(value);

  // "999 лет 365 дней 23 часа 59 минут 59 секунд"
  if (variant === 'Long') {
    return output(units, PLURAL_LONG);
  }

  // "999 лет 365 дн. 23 ч. 59 мин. 59 сек."
  if (variant === 'Short') {
    return output(units, PLURAL_SHORT);
  }

  return '';
}

// Вспомогательные локальные функции далее, экспорт опущен намеренно

function doubleDigit(value: number): string {
  return value >= 10
    ? `${value}`
    : `0${value}`;
}

function years(value: number): string {
  return plural(value, {
    one: 'год',
    few: 'года',
    many: 'лет',
  });
}

// Аккумулируем единицы измерения от меньших к большим
// "seconds: 65, minutes: 1" => "seconds: 5, minutes: 2"
function accumulated(value: Value): Required<Duration> {
  const duration: Duration = isDuration(value)
    ? value
    : {
        milliseconds: value,
      };

  let {
    years = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;
  const {
    milliseconds = 0,
  } = duration;

  // Миллисекунды не отображаются, поэтому просто добавляем их к секундам
  seconds += Math.floor(milliseconds / 1000);

  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;
  }

  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  if (hours >= 24) {
    days += Math.floor(hours / 24);
    hours = hours % 24;
  }

  if (days >= 366) {
    years += Math.floor(days / 366);
    days = days % 366;
  }

  return {
    years,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

function output(units: Required<Value>, rules: UnitFormatRules): string {
  const CHUNKS_EMPTY: string[] = [];
  const chunks: string[] = Object.entries(units).reduce((accum, [
    unit,
    value,
  ]) => {
    if (value > 0) {
      return [
        ...accum,
        rules[unit as keyof typeof rules](value),
      ];
    }

    return accum;
  }, CHUNKS_EMPTY);

  return unbreakable(chunks.join(' ').trim());
}

// Является развёрнутым объектом с единицами длительности?
function isDuration(value: Value): value is Duration {
  // Когда одно из двух, такой проверки достаточно
  return typeof value !== 'number';
}

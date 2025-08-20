import { isNumber } from '@sniptt/guards';
import type {
  Locale,
  RawValue,
} from './format.types';
import {
  numeric,
  unbreakable,
} from './index';

type Value = RawValue<number>;

// Правила для множественных слов
type Words = Required<Record<Extract<Intl.LDMLPluralRule, 'one' | 'few' | 'many'>, string>> &
  Partial<Record<Extract<Intl.LDMLPluralRule, 'zero' | 'two' | 'other'>, string>>; // Для обратной совместимости

interface PluralDestructured {
  count: string; // не value чтобы не пересекаться с ключами Vue, там кругом value
  word: string;
}

/**
 * Выбрать слово согласно правилам плюрализации в русском языке
 *
 * @param value - числовое значение по которому будет выбрано слово
 * @param words - слова для разных типов множеств (обязательные - для русского языке)
 *
 * @example
 * plural(1001, { one: 'минута', few: 'минуты', many: 'минут' }); // 1 001 минута
 * plural(1002, { one: 'минута', few: 'минуты', many: 'минут' }); // 1 002 минуты
 * plural(1005, { one: 'минута', few: 'минуты', many: 'минут' }); // 1 005 минут
 */
export function plural(value: Value, words: Words): string;

/**
 * Выбрать слово согласно правилам плюрализации в русском языке в виде объекта
 *
 * @param value - числовое значение по которому будет выбрано слово
 * @param words - слова для разных типов множеств (обязательные - для русского языке)
 * @param [destructured] - вернуть объект
 *
 * @example
 * // { count: '1 001', word: 'минута'}
 * plural(1001, { one: 'минута', few: 'минуты', many: 'минут' }, true);
 *
 * // { count: '1 002', word: 'минуты'}
 * plural(1002, { one: 'минута', few: 'минуты', many: 'минут' }, true);
 *
 * // { count: '1 005', word: 'минут'}
 * plural(5000, { one: 'минута', few: 'минуты', many: 'минут' }, true);
 */
export function plural(value: Value, words: Words, destructured: true): PluralDestructured;

/**
 * Выбрать слово согласно правилам плюрализации в русском языке в виде объекта
 *
 * @param value - числовое значение по которому будет выбрано слово
 * @param words - слова для разных типов множеств (обязательные - для русского языка)
 * @param [destructured] - вернуть объект
 *
 * @example
 * plural(1001, { one: 'минута', few: 'минуты', many: 'минут' }, false); // 1 001 минута
 * plural(1002, { one: 'минута', few: 'минуты', many: 'минут' }, false); // 1 002 минуты
 * plural(1005, { one: 'минута', few: 'минуты', many: 'минут' }, false); // 1 005 минут
 */
export function plural(value: Value, words: Words, destructured?: false): string;

export function plural(
  value: Value,
  words: Words,
  destructured: boolean = false,
): string | PluralDestructured {
  if (!isNumber(value)) {
    return '';
  }

  const integer: number = Math.trunc(value);

  const LOCALE: Locale = 'ru-RU';

  const rule: Intl.LDMLPluralRule = new Intl.PluralRules(LOCALE).select(integer);

  const WORDS_EMPTY: Required<Words> = {
    zero: '',
    one: '',
    two: '',
    few: '',
    many: '',
    other: '',
  };

  const word: string = Object.assign(WORDS_EMPTY, words)[rule];

  if (destructured) {
    return {
      count: numeric(value),
      word,
    };
  }

  return `${numeric(value)}\xA0${unbreakable(word)}`;
}

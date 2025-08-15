import {
  isArray,
  isString,
} from '@sniptt/guards';
import type { RawValue } from './format.types';

type Chunks = RawValue<string>[];
type Value = RawValue<string | Chunks>;

const UNBREAKABLE_SPACE: string = '\xA0';

/**
 * Заменить все пробелы на неразрывный пробел
 *
 * @example
 * unbreakable('Ты не пройдешь!'); // 'Ты_не_пройдешь!'
 */
export function unbreakable(value: Value): string;
/**
 * Разделить набор строк неразрывным пробелом
 *
 * @example
 * unbreakable(['Ты', 'не', 'пройдешь!']); // 'Ты_не_пройдешь!'
 * unbreakable(['Ты', 'не пройдешь!']); // 'Ты_не_пройдешь!'
 */
export function unbreakable(chunks: Chunks): string;

export function unbreakable(value: Value): string {
  if (!isString(value) && !isArray(value)) {
    return '';
  }

  if (isArray(value)) {
    return value
      .filter((chunk) => chunk !== undefined && chunk !== null) // Удаляем пустые значения заранее.
      .map((chunk) => replace(chunk!)) // Уже не боимся, что могут быть пустые.
      .filter((chunk) => chunk.length > 0) // Удаляем пустые строки после замен.
      .join(UNBREAKABLE_SPACE);
  }

  return replace(value);
}

// Заменить одиночные и множественные пробелы на неразрывный пробел
function replace(value: string): string {
  return value.trim().replace(/\s+/g, UNBREAKABLE_SPACE);
}

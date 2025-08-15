import { isNonEmptyArray } from '@sniptt/guards';
import type { RawValue } from './format.types';
import {
  time,
  unbreakable,
} from './index';

type DateISO8601 = string;

type Value = RawValue<[
  DateISO8601,
  DateISO8601,
]>;

export function timeRange(value: Value): string {
  if (!isNonEmptyArray(value)) {
    return '';
  }

  const [
    start,
    end,
  ] = value;
  return unbreakable(`${time(start)} – ${time(end)}`);
}

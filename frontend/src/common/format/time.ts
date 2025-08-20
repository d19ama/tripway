import { isString } from '@sniptt/guards';
import dayjs from 'dayjs';
import type { RawValue } from './format.types';

type DateISO8601 = string;

type Value = RawValue<DateISO8601>;

export function time(value: Value): string {
  if (!isString(value)) {
    return '';
  }

  return dayjs(value).format('HH:mm');
}

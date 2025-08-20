import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import {
  Observable,
  map,
} from 'rxjs';

import { Union } from 'ts-toolbelt';

// Типы, которые могут прийти с MKGate
type DataRaw =
  | string
  | number
  | object
  | boolean
  | undefined
  | null;

// Убираем невалидные типы на выходе
type DataOut = Union.NonNullable<DataRaw>;

// Защита от пустых ответов MKGate.
// Чтобы парсинге не развалились с ошибками "SyntaxError Unexpected end of JSON input"
@Injectable()
export class EmptyResponseInterceptor implements NestInterceptor<DataRaw, DataOut> {
  intercept(context: ExecutionContext, next: CallHandler<DataRaw>): Observable<DataOut> {
    return next
      .handle()
      .pipe(
        map((data) => {
          return isNotEmpty(data)
            ? data
            : {};
        }),
      );
  }
}

// Проверка на пустые значения.
// Функция локальная, не экспортировать!
function isNotEmpty(value: any): value is DataOut {
  return value !== undefined && value !== null;
}

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ROUTE_STATE_ENUM,
  RouteStateEnum,
} from './route-state.dto';

export class RouteDto {
  @ApiProperty({
    description: 'Уникальный идентификатор маршрута',
    example: '1234567890',
    type: String,
    required: true,
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Название маршрута',
    example: 'Евро-тур 2025',
    type: String,
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Дата начала маршрута',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  startDate: string;

  @IsString()
  @ApiProperty({
    description: 'Дата окончания маршрута',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  endDate: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Общая стоимость поездки',
    example: 0,
    type: Number,
    required: false,
  })
  costs?: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Маршрут открыт',
    example: false,
    type: Boolean,
    required: true,
  })
  opened: boolean;

  @IsBoolean()
  @ApiProperty({
    description: 'Маршрут активен',
    example: false,
    type: Boolean,
    required: true,
  })
  active: boolean;

  @IsString()
  @ApiProperty({
    description: 'Состояние маршрута',
    enum: ROUTE_STATE_ENUM,
    enumName: 'RouteState',
    example: 'new',
    type: String,
    required: true,
  })
  state: RouteStateEnum;
}

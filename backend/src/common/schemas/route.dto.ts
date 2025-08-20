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
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Название маршрута',
    example: 'Евро-тур 2025',
    type: String,
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Дата начала маршрута',
  })
  startDate: string;

  @IsString()
  @ApiProperty({
    description: 'Дата окончания маршрута',
  })
  endDate: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Общая стоимость поездки',
    example: 0,
    required: false,
  })
  costs?: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Маршрут открыт',
    example: false,
  })
  opened: boolean;

  @IsBoolean()
  @ApiProperty({
    description: 'Маршрут активен',
    example: false,
  })
  active: boolean;

  @IsString()
  @ApiProperty({
    description: 'Состояние маршрута',
    enum: ROUTE_STATE_ENUM,
    enumName: 'RouteState',
    example: 'new',
  })
  state: RouteStateEnum;
}

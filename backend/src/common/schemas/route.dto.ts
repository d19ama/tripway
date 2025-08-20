import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
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

  @IsDate()
  @ApiProperty({
    description: 'Дата начала маршрута',
  })
  startDate: Date;

  @IsDate()
  @ApiProperty({
    description: 'Дата окончания маршрута',
  })
  endDate: Date;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Общая стоимость поездки',
    example: 0,
    required: false,
  })
  costs: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Маршрут открыт',
    example: false,
    default: false,
  })
  opened: boolean;

  @IsBoolean()
  @ApiProperty({
    description: 'Маршрут активен',
    example: false,
    default: false,
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

  // @Column({
  //   array: true,
  // })
  // route: RouteSection[];
}

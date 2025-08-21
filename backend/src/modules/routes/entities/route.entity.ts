import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  ROUTE_STATE_ENUM,
  RouteDto,
  RouteStateEnum,
} from '../../../common/schemas';

@Entity({
  name: 'routeEntity',
})
export class RouteEntity extends RouteDto {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  id: string;

  @Column({
    name: 'Название маршрута',
    type: 'text',
    unique: true,
  })
  name: string;

  @CreateDateColumn({
    name: 'Дата создания маршрута',
  })
  @IsString()
  @ApiProperty({
    description: 'Дата создания маршрута',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'Дата обновления маршрута',
  })
  @IsString()
  @ApiProperty({
    description: 'Дата обновления маршрута',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  updatedAt: string;

  @Column({
    name: 'Дата начала маршрута',
    type: 'text',
  })
  startDate: string;

  @Column({
    name: 'Дата окончания маршрута',
    type: 'text',
  })
  endDate: string;

  @Column({
    name: 'Общая стоимость',
    type: 'integer',
    default: 0,
  })
  costs: number;

  @Column({
    name: 'Открыт',
    type: 'boolean',
    default: false,
  })
  opened: boolean;

  @Column({
    name: 'Маршрут активен',
    type: 'boolean',
    default: false,
  })
  active: boolean;

  @Column({
    name: 'Состояние маршрута',
    type: 'enum',
    enum: ROUTE_STATE_ENUM,
    enumName: 'RouteState',
    default: 'new',
  })
  state: RouteStateEnum;
}

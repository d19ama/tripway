import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  ROUTE_STATE_ENUM,
  RouteStateEnum,
} from '../../../common/schemas';
import { RouteSectionEntity } from '../../route-sections/entities';

@Entity({
  name: 'routeEntity',
})
export class RouteEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  @ApiProperty({
    description: 'Уникальный идентификатор маршрута',
    example: '1234567890',
    type: String,
    required: true,
  })
  id: string;

  @Column({
    name: 'Название маршрута',
    type: 'text',
    unique: true,
  })
  @IsString()
  @ApiProperty({
    description: 'Название маршрута',
    example: 'Евро-тур 2025',
    type: String,
    required: true,
  })
  name: string;

  @CreateDateColumn({
    name: 'Дата создания маршрута',
  })
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
  @IsString()
  @ApiProperty({
    description: 'Дата начала маршрута',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  startDate: string;

  @Column({
    name: 'Дата окончания маршрута',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Дата окончания маршрута',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  endDate: string;

  @Column({
    name: 'Общая стоимость',
    type: 'integer',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Общая стоимость поездки',
    example: 0,
    type: Number,
    required: false,
  })
  costs: number;

  @Column({
    name: 'Открыт',
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  @ApiProperty({
    description: 'Маршрут открыт',
    example: false,
    type: Boolean,
    required: true,
  })
  opened: boolean;

  @Column({
    name: 'Маршрут активен',
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  @ApiProperty({
    description: 'Маршрут активен',
    example: false,
    type: Boolean,
    required: true,
  })
  active: boolean;

  @Column({
    name: 'Состояние маршрута',
    type: 'enum',
    enum: ROUTE_STATE_ENUM,
    enumName: 'RouteState',
    default: 'new',
  })
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

  @OneToMany(
    () => RouteSectionEntity,
    (section) => section.routeId,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn()
  @IsArray({
    each: true,
  })
  @ApiProperty({
    description: 'Массив идентификаторов секций в маршруте',
    type: [
      RouteSectionEntity,
    ],
    required: true,
  })
  routeSections: RouteSectionEntity[];
}

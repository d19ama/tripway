import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TRANSPORT_TYPE_ENUM } from '../../../common/schemas';
import { RouteEntity } from '../../routes/entities';

@Entity({
  name: 'routeSectionEntity',
})
export class RouteSectionEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID',
  })
  @ApiProperty({
    description: 'Уникальный идентификатор секции маршрута',
    example: '1234567890',
    type: String,
    required: true,
  })
  id: string;

  @CreateDateColumn({
    name: 'Дата создания секции маршрута',
  })
  @ApiProperty({
    description: 'Дата создания секции маршрута',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'Дата обновления секции маршрута',
  })
  @ApiProperty({
    description: 'Дата обновления секции маршрута',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  updatedAt: string;

  @ManyToOne(
    () => RouteEntity,
    (route) => route.routeSections,
  )
  @IsString()
  @ApiProperty({
    description: 'Идентификатор маршрута',
    example: '1234567890',
    type: String,
    required: true,
  })
  routeId: RouteEntity['id'];

  @Column({
    name: 'Город назначения',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Город назначения',
    example: 'Москва',
    type: String,
    required: true,
  })
  destinationCity: string;

  @Column({
    name: 'Страна назначения',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Страна назначения',
    example: 'Россия',
    type: String,
    required: true,
  })
  destinationCountry: string;

  @Column({
    name: 'Дата отправления',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Дата отправления',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  departure: string;

  @Column({
    name: 'Дата прибытия',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Дата прибытия',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  arrival: string;

  @Column({
    name: 'Тип транспорта',
    type: 'enum',
    enum: TRANSPORT_TYPE_ENUM,
    enumName: 'TransportType',
  })
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Тип транспортного средства',
    example: 'airplane',
    type: String,
    required: false,
    enum: TRANSPORT_TYPE_ENUM,
    enumName: 'TransportType',
  })
  transportType?: string;

  @Column({
    name: 'Стоимость перемещения',
    type: 'text',
    default: '',
  })
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Стоимость перемещения',
    example: '0',
    type: String,
    required: false,
  })
  movingCost?: string;

  @Column({
    name: 'Место пребывания',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Место пребывания',
    example: 'Отель',
    type: String,
    required: true,
  })
  stayingPlace: string;

  @Column({
    name: 'Стоимость проживания',
    type: 'text',
    default: '',
  })
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Стоимость проживания',
    example: '0',
    type: String,
    required: false,
  })
  stayingCost?: string;

  @Column({
    name: 'Позиция в маршруте',
    type: 'integer',
  })
  @IsNumber()
  @ApiProperty({
    description: 'Номер позиции в маршруте',
    example: 1,
    type: Number,
    required: true,
  })
  position: number;

  @Column({
    name: 'Широта',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Координаты широты',
    example: '64.6863136',
    type: String,
    required: true,
  })
  latitude: string;

  @Column({
    name: 'Долгота',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Координаты долготы',
    example: '97.7453061',
    type: String,
    required: true,
  })
  longitude: string;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Уникальный идентификатор',
    example: '1234567890',
    type: String,
    required: true,
  })
  id: number;

  @CreateDateColumn({
    name: 'Дата создания',
  })
  @ApiProperty({
    description: 'Дата создания',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'Дата обновления',
  })
  @ApiProperty({
    description: 'Дата обновления',
    example: '2025-08-21T07:48:50.363Z',
    type: String,
    required: true,
  })
  updatedAt: string;

  @Column({
    name: 'Имя',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Имя',
    example: 'Артём',
    type: String,
    required: true,
  })
  name: string;

  @Column({
    name: 'Фамилия',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Фамилия',
    example: 'Анпилов',
    type: String,
    required: true,
  })
  surname: string;

  @Column({
    name: 'Прозвище',
    type: 'text',
    unique: true,
    default: '',
  })
  @IsString()
  @ApiPropertyOptional({
    description: 'Прозвище',
    example: 'Fucker666',
    type: String,
    required: false,
  })
  nickname?: string;

  @Column({
    name: 'Отчество',
    type: 'text',
  })
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Отчество',
    example: 'Михайлович',
    type: String,
    required: false,
  })
  patronymic?: string;

  @Column({
    name: 'Email',
    type: 'text',
    unique: true,
  })
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'example@example.com',
    type: String,
    required: true,
  })
  email: string;

  @Column({
    name: 'Пароль',
    type: 'text',
  })
  @IsString()
  @ApiProperty({
    description: 'Пароль',
    example: 'password',
    type: String,
    required: true,
  })
  password: string;
}

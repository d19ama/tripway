import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
} from 'class-validator';

export class LoginInRequestDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'email@email.com',
    type: String,
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Пароль',
    type: String,
    required: true,
  })
  password: string;
}

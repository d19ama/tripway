import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReadRouteRequestDto {
  @IsString()
  @ApiProperty({
    description: 'Идентификатор маршрута',
    example: '1',
    type: String,
    required: true,
  })
  id: string;
}

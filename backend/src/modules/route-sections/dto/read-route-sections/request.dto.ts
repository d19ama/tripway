import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReadRouteSectionsRequestDto {
  @IsString()
  @ApiProperty({
    description: 'Идентификатор маршрута',
    example: '1234567890',
    type: String,
    required: true,
  })
  routeId: string;
}

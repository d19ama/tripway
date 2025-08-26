import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RegistrationRequestDto } from './dto/registration';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  @ApiOperation({
    summary: 'Регистрация',
    operationId: 'registration',
  })
  registration(@Body() body: RegistrationRequestDto): Promise<void> {
    return this.registrationService.registration(body);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '../../decorators';
import { RegistrationService } from './registration.service';

// DTO
import { RegistrationRequestDto } from './dto/registration';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
  ) {}

  @Public()
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

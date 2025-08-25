import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

// DTO
import {
  SignInRequestDto,
  SignInResponseDto,
} from './dto/sign-in';
import { RegistrationRequestDto } from './dto/registration';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Авторизация',
    operationId: 'signIn',
  })
  signIn(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  @ApiOperation({
    summary: 'Регистрация',
    operationId: 'registration',
  })
  registration(@Body() body: RegistrationRequestDto): Promise<void> {
    return this.authService.registration(body);
  }
}

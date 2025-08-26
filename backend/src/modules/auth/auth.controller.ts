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
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '../../decorators';
import { AuthService } from './auth.service';

// DTO
import {
  LoginInRequestDto,
  LoginResponseDto,
} from './dto/login';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Авторизация',
    operationId: 'login',
  })
  login(@Body() body: LoginInRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }
}

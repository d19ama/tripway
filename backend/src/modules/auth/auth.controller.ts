import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../../decorators';
import { AuthService } from './auth.service';

// DTO
import {
  LoginRequestDto,
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
  login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Аутентификация',
    operationId: 'authenticate',
  })
  async authenticate(@Req() request: Request) {
    return request.user;
  }
}

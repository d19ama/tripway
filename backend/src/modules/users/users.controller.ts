import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '../../decorators';
import { UsersService } from './users.service';
import { ReadUserRequestDto } from './dto/read-user';
import { CreateUserRequestDto } from './dto/create-user';
import { UserEntity } from './entities';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Получение пользователя',
    operationId: 'readUser',
  })
  async readUser(@Param('email') email: ReadUserRequestDto['email']): Promise<UserEntity> {
    return await this.usersService.readUser(email);
  }

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Создание пользователя',
    operationId: 'createUser',
  })
  async createUser(@Body() body: CreateUserRequestDto): Promise<UserEntity> {
    return await this.usersService.createUser(body);
  }
}

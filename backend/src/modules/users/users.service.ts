import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { ReadUserRequestDto } from './dto/read-user';
import { CreateUserRequestDto } from './dto/create-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async readUser(email: ReadUserRequestDto['email']): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  async createUser(body: CreateUserRequestDto): Promise<UserEntity> {
    const newUser: UserEntity = this.usersRepository.create(body);

    return await this.usersRepository.save(newUser);
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegistrationRequestDto } from './dto/registration';

@Injectable()
export class RegistrationService {
  constructor(
    private usersService: UsersService,
  ) {}

  async registration(body: RegistrationRequestDto): Promise<void> {
    await this.usersService.createUser(body);
  }
}

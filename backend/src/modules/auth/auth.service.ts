import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

// ENTITIES
import { UserEntity } from '../users/entities';

// DTO
import {
  SignInRequestDto,
  SignInResponseDto,
} from './dto/sign-in';
import { RegistrationRequestDto } from './dto/registration';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async signIn(body: SignInRequestDto): Promise<SignInResponseDto> {
    const user: UserEntity = await this.usersService.readUser(body.email);

    if (user?.password !== body.password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async registration(body: RegistrationRequestDto): Promise<void> {
    await this.usersService.createUser(body);
  }
}

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

// ENTITIES
import { UserEntity } from '../users/entities';

// DTO
import { RegistrationRequestDto } from '../registration/dto/registration';
import {
  SignInRequestDto,
  SignInResponseDto,
} from './dto/sign-in';
import { AuthProvider } from './providers/auth.provider';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: SignInRequestDto): Promise<SignInResponseDto> {
    const user: UserEntity = await this.usersService.readUser(body.email);

    const isAccessGranted: boolean = await AuthProvider.comparePasswords(
      body.password,
      user?.password,
    );

    if (!isAccessGranted) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registration(body: RegistrationRequestDto): Promise<void> {
    await this.usersService.createUser(body);
  }
}

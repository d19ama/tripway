import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities';
import { AuthProvider } from './providers/auth.provider';
import {
  LoginRequestDto,
  LoginResponseDto,
} from './dto/login';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginRequestDto): Promise<LoginResponseDto> {
    const user: UserEntity = await this.usersService.readUser(body.email);

    const isAccessGranted: boolean = await AuthProvider.comparePasswords(
      body.password,
      user?.password,
    );

    if (!isAccessGranted) {
      throw new UnauthorizedException();
    }

    const token: string = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      token,
    };
  }
}

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities';

import { AuthProvider } from './providers/auth.provider';
import {
  LoginInRequestDto,
  LoginResponseDto,
} from './dto/login';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(body: LoginInRequestDto): Promise<LoginResponseDto> {
    const user: UserEntity = await this.usersService.readUser(body.email);

    const isAccessGranted: boolean = await AuthProvider.comparePasswords(
      body.password,
      user?.password,
    );

    if (!isAccessGranted) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    }, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('JWT_EXPIRES'),
    });

    return {
      token,
    };
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JWT_SECRET_KEY } from '../../common/constants';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
  ],
})
export class AuthModule {}

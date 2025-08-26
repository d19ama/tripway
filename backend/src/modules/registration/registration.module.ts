import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [
    RegistrationService,
  ],
  controllers: [
    RegistrationController,
  ],
})
export class RegistrationModule {}

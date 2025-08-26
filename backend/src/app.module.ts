import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EmptyResponseInterceptor } from './interceptors';

// MODULES
import { AuthModule } from './modules/auth/auth.module';
import { RoutesModule } from './modules/routes/routes.module';
import { RoutesSectionsModule } from './modules/route-sections/route-sections.module';
import { UsersModule } from './modules/users/users.module';
import { RegistrationModule } from './modules/registration/registration.module';

// SUBSCRIBERS
import { AuthSubscriber } from './modules/auth/subscribers/auth.subscriber';
import { CreateRouteSectionSubscriber } from './modules/route-sections/subscribers/create-route-section.subscriber';

// ENTITIES
import { RouteEntity } from './modules/routes/entities';
import { RouteSectionEntity } from './modules/route-sections/entities';
import { UserEntity } from './modules/users/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.local',
        '.env',
      ],
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: Number.parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER_NAME,
      password: process.env.DATABASE_USER_PASSWORD,
      synchronize: process.env.ENV !== 'production',
      subscribers: [
        AuthSubscriber,
        CreateRouteSectionSubscriber,
      ],
      entities: [
        UserEntity,
        RouteEntity,
        RouteSectionEntity,
      ],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      RouteEntity,
      RouteSectionEntity,
    ]),
    RoutesModule,
    RoutesSectionsModule,
    UsersModule,
    AuthModule,
    RegistrationModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: EmptyResponseInterceptor,
    },
  ],
})
export class AppModule {}

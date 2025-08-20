import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmptyResponseInterceptor } from './interceptors';

import { RouteEntity } from './modules/routes/entities/route.entity';
import { RoutesModule } from './modules/routes/routes.module';

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
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USER_NAME,
      password: process.env.USER_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        RouteEntity,
      ],
      synchronize: process.env.ENV !== 'production',
    }),
    TypeOrmModule.forFeature([
      RouteEntity,
    ]),
    RoutesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: EmptyResponseInterceptor,
    },
  ],
})
export class AppModule {}

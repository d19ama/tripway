import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmptyResponseInterceptor } from './interceptors';

// MODULES
import { RouteEntity } from './modules/routes/entities';
import { RoutesModule } from './modules/routes/routes.module';
import { RoutesSectionsModule } from './modules/route-sections/route-sections.module';
import { RouteSectionEntity } from './modules/route-sections/entities';

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
      entities: [
        RouteEntity,
        RouteSectionEntity,
      ],
    }),
    TypeOrmModule.forFeature([
      RouteEntity,
      RouteSectionEntity,
    ]),
    RoutesModule,
    RoutesSectionsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: EmptyResponseInterceptor,
    },
  ],
})
export class AppModule {}

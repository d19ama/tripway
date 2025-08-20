import {
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

/**
 * MODULES
 */
import { EmptyResponseInterceptor } from './interceptors';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.local',
        '.env',
      ],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: EmptyResponseInterceptor,
    },
  ],
})

export class AppModule implements NestModule {
  configure() {}
}

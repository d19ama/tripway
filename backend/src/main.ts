import * as process from 'node:process';
import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import {
  OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import generateSwaggerDocument from './generate-swagger-document';

const API_BASE_PATH = '/api/v1';

const DISABLE_SWAGGER = [
  'production',
];

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const server = app.getHttpServer();

  server.keepAliveTimeout = 70000; // 60 секунд
  server.headersTimeout = 75000; // чуть больше keepAliveTimeout

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(API_BASE_PATH);

  // Закрываем генерацию сваггера на проде
  if (!DISABLE_SWAGGER.includes(process.env.ENV ?? '')) {
    const document: OpenAPIObject = generateSwaggerDocument(app);

    SwaggerModule.setup(
      API_BASE_PATH,
      app,
      document,
    );
  }

  const [
    , , ...args
  ] = process.argv;

  // Процесс запущен, только для генерации сваггер схемы
  if (args.includes('--no-serve')) {
    await app.close();
    return;
  }

  const validation: ValidationPipe = new ValidationPipe({
    disableErrorMessages: true,
    whitelist: true,
    transform: true,
  });

  app.enableCors();
  app.useGlobalPipes(validation);
  app.getHttpAdapter().getInstance().disable('x-powered-by').set('etag', false);

  // app.use(session({
  //   secret: 'my-secret',
  //   resave: false,
  //   saveUninitialized: false,
  // }));

  app.use(cookieParser());

  await app.listen(configService.get('PORT', process.env.PORT));
}

void bootstrap();

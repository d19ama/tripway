import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('TripRoute/API')
  .setVersion('v1')
  .build();

function generateSwaggerDocument(app: INestApplication): OpenAPIObject {
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  const jsonSchema: string = JSON.stringify(document);
  const swaggerSchemaFolder: string = path.resolve(process.cwd(), './docs/swagger');

  fs.mkdirSync(swaggerSchemaFolder, {
    recursive: true,
  });

  fs.writeFileSync(
    path.resolve(swaggerSchemaFolder, './schema.json'),
    jsonSchema,
  );

  return document;
}

export default generateSwaggerDocument;

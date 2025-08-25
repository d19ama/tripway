import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

// ENTITIES
import { RouteEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteEntity,
    ]),
  ],
  controllers: [
    RoutesController,
  ],
  providers: [
    RoutesService,
  ],
  exports: [
    RoutesService,
  ],
})
export class RoutesModule {}

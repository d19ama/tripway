import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entities';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

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
})
export class RoutesModule {}

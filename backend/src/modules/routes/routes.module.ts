import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entities/route.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteEntity,
    ]),
  ],
  exports: [
    TypeOrmModule,
  ],
  controllers: [
    RoutesController,
  ],
  providers: [
    RoutesService,
  ],
})
export class RoutesModule {}

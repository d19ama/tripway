import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteSectionEntity } from './entities';
import { RouteSectionsService } from './route-sections.service';
import { RouteSectionsController } from './route-sections.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteSectionEntity,
    ]),
  ],
  controllers: [
    RouteSectionsController,
  ],
  providers: [
    RouteSectionsService,
  ],
})
export class RoutesSectionsModule {}

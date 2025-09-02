import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from '../routes/routes.module';
import { RouteSectionEntity } from './entities';
import { RouteSectionsService } from './route-sections.service';
import { RouteSectionsController } from './route-sections.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteSectionEntity,
    ]),
    RoutesModule,
  ],
  controllers: [
    RouteSectionsController,
  ],
  providers: [
    RouteSectionsService,
  ],
})
export class RoutesSectionsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from '../routes/routes.module';
import { RouteSectionEntity } from './entities';
import { RouteSectionsService } from './route-sections.service';
import { RouteSectionsController } from './route-sections.controller';
import { CreateRouteSectionSubscriber } from './subscribers/create-route-section.subscriber';

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
    CreateRouteSectionSubscriber,
  ],
})
export class RoutesSectionsModule {}

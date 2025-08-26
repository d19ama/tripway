import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { RouteSectionEntity } from '../entities';
import { RoutesService } from '../../routes/routes.service';

@EventSubscriber()
export class CreateRouteSectionSubscriber implements EntitySubscriberInterface<RouteSectionEntity> {
  constructor(
    private routesService: RoutesService,
  ) {}

  listenTo(): typeof RouteSectionEntity {
    return RouteSectionEntity;
  }

  async afterInsert({
    entity,
  }: InsertEvent<RouteSectionEntity>): Promise<void> {
    await this.routesService.updateRoute(entity.routeId, {
      routeSectionsIds: [
        entity.id,
      ],
    });
  }
}

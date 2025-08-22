import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ENTITIES
import { RoutesService } from '../routes/routes.service';
import { RouteSectionEntity } from './entities';

// DTO
import {
  CreateRouteSectionRequestDto,
  CreateRouteSectionResponseDto,
} from './dto/create-route-section';
import { ReadRouteSectionsRequestDto } from './dto/read-route-sections';

@Injectable()
export class RouteSectionsService {
  constructor(
    @InjectRepository(RouteSectionEntity)
    private routeSectionsRepository: Repository<RouteSectionEntity>,
    private routesService: RoutesService,
  ) {}

  async readAllRouteSections(routeId: ReadRouteSectionsRequestDto['routeId']): Promise<RouteSectionEntity[]> {
    return await this.routeSectionsRepository.findBy({
      routeId,
    });
  }

  async createRouteSection(body: CreateRouteSectionRequestDto): Promise<CreateRouteSectionResponseDto> {
    const newRouteSection: CreateRouteSectionResponseDto = this.routeSectionsRepository.create(body);

    const savedRouteSection = await this.routeSectionsRepository.save(newRouteSection);

    await this.routesService.updateRoute(body.routeId, {
      routeSectionsIds: [
        savedRouteSection.id,
      ],
    });

    return savedRouteSection;
  }
}

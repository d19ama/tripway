import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteSectionEntity } from './entities';
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
  ) {}

  async readAllRouteSections(routeId: ReadRouteSectionsRequestDto['routeId']): Promise<RouteSectionEntity[]> {
    return await this.routeSectionsRepository.findBy({
      routeId,
    });
  }

  async createRouteSection(body: CreateRouteSectionRequestDto): Promise<CreateRouteSectionResponseDto> {
    const newRouteSection: CreateRouteSectionResponseDto = this.routeSectionsRepository.create(body);

    return await this.routeSectionsRepository.save(newRouteSection);
  }
}

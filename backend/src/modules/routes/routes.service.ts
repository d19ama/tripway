import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO
import { RouteEntity } from './entities';
import { ReadRouteRequestDto } from './dto/read-route';
import { DeleteRouteRequestDto } from './dto/delete-route';
import { CreateRouteRequestDto } from './dto/create-route';
import { UpdateRouteRequestDto } from './dto/update-route';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RouteEntity)
    private routesRepository: Repository<RouteEntity>,
  ) {}

  async readAllRoutes(): Promise<RouteEntity[]> {
    return await this.routesRepository.find();
  }

  async createRoute(body: CreateRouteRequestDto): Promise<CreateRouteRequestDto> {
    const newRoute: CreateRouteRequestDto = this.routesRepository.create(body);

    return await this.routesRepository.save(newRoute);
  }

  async readRoute(id: ReadRouteRequestDto['id']): Promise<ReadRouteRequestDto | null> {
    return await this.routesRepository.findOneBy({
      id,
    });
  }

  async updateRoute(id: UpdateRouteRequestDto['id'], body: Partial<UpdateRouteRequestDto>): Promise<RouteEntity> {
    await this.routesRepository.update(id, body);

    return this.routesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteRoute(id: DeleteRouteRequestDto['id']): Promise<void> {
    await this.routesRepository.delete(id);
  }
}

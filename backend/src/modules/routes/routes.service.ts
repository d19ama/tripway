import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO
import { RouteEntity } from './entities';
import { ReadRouteRequestDto } from './dto/read-route';
import { DeleteRouteRequestDto } from './dto/delete-route/request.dto';
import { CreateRouteRequestDto } from './dto/create-route';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RouteEntity)
    private routesRepository: Repository<RouteEntity>,
  ) {}

  async readAllRoutes(): Promise<RouteEntity[]> {
    return await this.routesRepository.find();
  }

  async readRoute(id: ReadRouteRequestDto['id']): Promise<RouteEntity | null> {
    return await this.routesRepository.findOneBy({
      id,
    });
  }

  async createRoute(body: CreateRouteRequestDto): Promise<RouteEntity> {
    return this.routesRepository.create(body);
  }

  async deleteRoute(id: DeleteRouteRequestDto['id']): Promise<void> {
    await this.routesRepository.delete(id);
  }
}

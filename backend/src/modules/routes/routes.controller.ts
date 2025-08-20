import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { RouteEntity } from './entities';
import { ReadRouteRequestDto } from './dto/read-route';
import { DeleteRouteRequestDto } from './dto/delete-route';
import { CreateRouteRequestDto } from './dto/create-route';

@Controller()
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
  ) {}

  @Get('/routes')
  @ApiOperation({
    summary: 'Получение всех маршрутов',
    operationId: 'readAllRoutes',
  })
  async readAllRoutes(): Promise<RouteEntity[]> {
    return await this.routesService.readAllRoutes();
  }

  @Get('/routes/:id')
  @ApiOperation({
    summary: 'Получение маршрута по id',
    operationId: 'readRoute',
  })
  async readRoute(@Param() id: ReadRouteRequestDto['id']): Promise<RouteEntity> {
    return await this.routesService.readRoute(id);
  }

  @Post('/routes/_create')
  @ApiOperation({
    summary: 'Создание нового маршрута',
    operationId: 'createRoute',
  })
  async createRoute(@Body() body: CreateRouteRequestDto): Promise<RouteEntity> {
    return await this.routesService.createRoute(body);
  }

  @Delete('/routes/:id')
  @ApiOperation({
    summary: 'Удаление маршрута по id',
    operationId: 'deleteRoute',
  })
  async deleteRoute(@Param() id: DeleteRouteRequestDto['id']): Promise<void> {
    return await this.routesService.deleteRoute(id);
  }
}

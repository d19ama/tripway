import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { RouteEntity } from './entities';
import { ReadRouteRequestDto } from './dto/read-route';
import { DeleteRouteRequestDto } from './dto/delete-route';
import { CreateRouteRequestDto } from './dto/create-route';
import { UpdateRouteRequestDto } from './dto/update-route';

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Получение всех маршрутов',
    operationId: 'readAllRoutes',
  })
  readAllRoutes(): Promise<RouteEntity[]> {
    return this.routesService.readAllRoutes();
  }

  @Post('')
  @ApiOperation({
    summary: 'Создание нового маршрута',
    operationId: 'createRoute',
  })
  async createRoute(
    @Body() body: CreateRouteRequestDto,
  ): Promise<CreateRouteRequestDto> {
    return this.routesService.createRoute(body);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение маршрута по id',
    operationId: 'readRoute',
  })
  async readRoute(
    @Param('id') id: ReadRouteRequestDto['id'],
  ): Promise<ReadRouteRequestDto> {
    return await this.routesService.readRoute(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление маршрута по id',
    operationId: 'updateRoute',
  })
  async updateRoute(
    @Param('id') id: UpdateRouteRequestDto['id'],
    @Body() body: UpdateRouteRequestDto,
  ): Promise<RouteEntity> {
    return this.routesService.updateRoute(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление маршрута по id',
    operationId: 'deleteRoute',
  })
  async deleteRoute(
    @Param('id') id: DeleteRouteRequestDto['id'],
  ): Promise<void> {
    return await this.routesService.deleteRoute(id);
  }
}

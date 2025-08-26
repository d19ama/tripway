import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoutesService } from './routes.service';

// ENTITIES
import { RouteEntity } from './entities';

// DTO
import {
  ReadRouteRequestDto,
  ReadRouteResponseDto,
} from './dto/read-route';
import { DeleteRouteRequestDto } from './dto/delete-route';
import {
  CreateRouteRequestDto,
  CreateRouteResponseDto,
} from './dto/create-route';
import {
  UpdateRouteRequestDto,
  UpdateRouteResponseDto,
} from './dto/update-route';

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Получение всех маршрутов',
    operationId: 'readAllRoutes',
  })
  readAllRoutes(): Promise<RouteEntity[]> {
    return this.routesService.readAllRoutes();
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Создание нового маршрута',
    operationId: 'createRoute',
  })
  async createRoute(
    @Body() body: CreateRouteRequestDto,
  ): Promise<CreateRouteResponseDto> {
    return this.routesService.createRoute(body);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Получение маршрута по id',
    operationId: 'readRoute',
  })
  async readRoute(
    @Param('id') id: ReadRouteRequestDto['id'],
  ): Promise<ReadRouteResponseDto> {
    return await this.routesService.readRoute(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление маршрута по id',
    operationId: 'updateRoute',
  })
  async updateRoute(
    @Param('id') id: UpdateRouteRequestDto['id'],
    @Body() body: UpdateRouteRequestDto,
  ): Promise<UpdateRouteResponseDto> {
    return this.routesService.updateRoute(id, body);
  }

  @UseGuards(AuthGuard)
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

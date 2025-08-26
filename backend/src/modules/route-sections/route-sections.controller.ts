import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RouteSectionsService } from './route-sections.service';

// ENTITIES
import { RouteSectionEntity } from './entities';

// DTO
import {
  CreateRouteSectionRequestDto,
  CreateRouteSectionResponseDto,
} from './dto/create-route-section';
import { ReadRouteSectionsRequestDto } from './dto/read-route-sections';

@Controller('route-sections')
export class RouteSectionsController {
  constructor(
    private readonly routeSectionsService: RouteSectionsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':routeId')
  @ApiOperation({
    summary: 'Получение всех секций маршрута',
    operationId: 'readAllRouteSections',
  })
  readAllRouteSections(
    @Param('routeId') routeId: ReadRouteSectionsRequestDto['routeId'],
  ): Promise<RouteSectionEntity[]> {
    return this.routeSectionsService.readAllRouteSections(routeId);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Создание нового маршрута',
    operationId: 'createRouteSection',
  })
  createRouteSection(
    @Body() body: CreateRouteSectionRequestDto,
  ): Promise<CreateRouteSectionResponseDto> {
    return this.routeSectionsService.createRouteSection(body);
  }
}

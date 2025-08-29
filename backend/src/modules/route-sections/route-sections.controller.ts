import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RouteSectionsService } from './route-sections.service';
import { RouteSectionEntity } from './entities';
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

  @Get(':routeId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение всех секций маршрута',
    operationId: 'readAllRouteSections',
  })
  readAllRouteSections(
    @Param('routeId') routeId: ReadRouteSectionsRequestDto['routeId'],
  ): Promise<RouteSectionEntity[]> {
    return this.routeSectionsService.readAllRouteSections(routeId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
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

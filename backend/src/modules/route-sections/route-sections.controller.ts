import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RouteSectionsService } from './route-sections.service';
import {
  CreateRouteSectionRequestDto,
  CreateRouteSectionResponseDto,
} from './dto/create-route-section';

@Controller('route-sections')
export class RouteSectionsController {
  constructor(
    private readonly routeSectionsService: RouteSectionsService,
  ) {}

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

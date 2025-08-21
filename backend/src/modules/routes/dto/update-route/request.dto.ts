import { PartialType } from '@nestjs/swagger';
import { RouteEntity } from '../../entities';

export class UpdateRouteRequestDto extends PartialType(RouteEntity) {}

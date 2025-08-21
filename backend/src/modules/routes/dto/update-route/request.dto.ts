import { PartialType } from '@nestjs/swagger';
import { RouteDto } from '../../../../common/schemas';

export class UpdateRouteRequestDto extends PartialType(RouteDto) {}

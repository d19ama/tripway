import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../entities';

export class ReadUserRequestDto extends PickType(UserEntity, [
  'email',
]) {}

import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AuthProvider } from '../providers/auth.provider';
import { UserEntity } from '../../users/entities';

@EventSubscriber()
export class AuthSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  async beforeInsert({
    entity,
  }: InsertEvent<UserEntity>): Promise<void> {
    if (entity.password) {
      entity.password = await AuthProvider.generateHash(
        entity.password,
      );
    }

    if (entity.email) {
      entity.email = entity.email.toLowerCase();
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<UserEntity>): Promise<void> {
    if (entity.password) {
      const password: string = await AuthProvider.generateHash(
        entity.password,
      );

      if (password !== databaseEntity?.password) {
        entity.password = password;
      }
    }
  }
}

import type { RegistrationRequestDto } from '@/modules/registration/types';

export const DEFAULT_REGISTRATION: RegistrationRequestDto = {
  id: '',
  createdAt: '',
  updatedAt: '',
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  password: '',
};

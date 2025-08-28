import {
  type Ref,
  ref,
} from 'vue';
import type { RegistrationRequestDto } from '../types';
import { api } from '@/modules/http';

interface UseRegistrationReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  register: (body: RegistrationRequestDto) => Promise<void>;
}

export function useRegistration(): UseRegistrationReturn {
  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function register(body: RegistrationRequestDto): Promise<void> {
    isLoading.value = true;

    const {
      status,
    } = await api.post<void>('/registration', {
      body,
    });

    isLoading.value = false;

    if (status !== 200) {
      isError.value = true;
    }
  }

  return {
    isError,
    isLoading,
    register,
  };
}

import {
  type Ref,
  ref,
} from 'vue';
import type { RegistrationRequestDto } from '../types';
import { useHttpService } from '@/modules/http';

interface UseRegistrationReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  register: (body: RegistrationRequestDto) => Promise<void>;
}

export function useRegistration(): UseRegistrationReturn {
  const {
    fetch,
  } = useHttpService();

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function register(body: RegistrationRequestDto): Promise<void> {
    isLoading.value = true;

    const {
      error,
    } = await fetch('/registration').post(body).json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
    }
  }

  return {
    isError,
    isLoading,
    register,
  };
}

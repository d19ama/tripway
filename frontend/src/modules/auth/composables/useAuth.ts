import {
  type Ref,
  ref,
} from 'vue';
import type { LoginRequestDto } from '../types';
import { useHttpService } from '@/modules/http';

interface UseAuthReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  login: (body: LoginRequestDto) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const {
    fetch,
  } = useHttpService();

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function login(body: LoginRequestDto): Promise<void> {
    isLoading.value = true;

    const {
      error,
    } = await fetch('/auth/login').post(body).json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
    }
  }

  return {
    isError,
    isLoading,
    login,
  };
}

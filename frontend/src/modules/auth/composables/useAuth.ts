import {
  type Ref,
  ref,
} from 'vue';
import type {
  LoginRequestDto,
  LoginResponseDto,
} from '../types';
import { useHttpService } from '@/modules/http';
import { useToken } from '@/modules/auth/composables/useToken';

interface UseAuthReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  login: (body: LoginRequestDto) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const {
    fetch,
  } = useHttpService();

  const {
    setToken,
  } = useToken();

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function login(body: LoginRequestDto): Promise<void> {
    isLoading.value = true;

    const {
      data,
      error,
    } = await fetch<LoginResponseDto>('/auth/login').post(body).json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
    }

    if (data.value) {
      setToken(data.value.token);
    }
  }

  return {
    isError,
    isLoading,
    login,
  };
}

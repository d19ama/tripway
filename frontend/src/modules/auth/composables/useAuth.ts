import {
  type Ref,
  ref,
} from 'vue';
import type {
  LoginRequestDto,
  LoginResponseDto,
} from '../types';
import { api } from '@/modules/http';
import { useToken } from '@/modules/auth/composables/useToken';

interface UseAuthReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  login: (body: LoginRequestDto) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const {
    setToken,
  } = useToken();

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function login(body: LoginRequestDto): Promise<void> {
    isLoading.value = true;

    const {
      data,
    } = await api.post<LoginResponseDto>('/auth/login', {
      body,
    });

    isLoading.value = false;

    if (!data) {
      isError.value = true;
    }

    if (data) {
      setToken(data.token);
    }
  }

  return {
    isError,
    isLoading,
    login,
  };
}

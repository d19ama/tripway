import type {
  LoginRequestDto,
  LoginResponseDto,
} from '../types';
import { useToken } from '@/modules/auth/composables/useToken';
import type { HttpStates } from '@/modules/http/types';
import { useApi } from '@/modules/http/composables';

interface UseAuthReturn extends HttpStates {
  login: (body: LoginRequestDto) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const {
    setToken,
  } = useToken();

  const {
    httpError,
    httpLoading,
    callApi,
  } = useApi();

  async function login(body: LoginRequestDto): Promise<void> {
    const data: LoginResponseDto | undefined = await callApi<LoginResponseDto>(
      'post',
      '/auth/login',
      body,
    );

    if (data) {
      setToken(data.token);
    }
  }

  return {
    httpError,
    httpLoading,
    login,
  };
}

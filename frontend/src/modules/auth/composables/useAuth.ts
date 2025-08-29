import { useRouter } from 'vue-router';
import type {
  AuthenticationResponse,
  LoginRequestDto,
  LoginResponseDto,
} from '../types';
import { useToken } from '@/modules/auth/composables/useToken';
import type { HttpStates } from '@/modules/http/types';
import { useApi } from '@/modules/http/composables';
import { useUsers } from '@/modules/users';
import { RouteNames } from '@/app/router/route-names';

interface UseAuthReturn extends HttpStates {
  login: (body: LoginRequestDto) => Promise<void>;
  logout: () => void;
  authenticate: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const {
    setToken,
    removeToken,
  } = useToken();

  const {
    readUser,
  } = useUsers();

  const {
    httpError,
    httpLoading,
    callApi,
  } = useApi();

  const router = useRouter();

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

  function logout(): void {
    removeToken();
  }

  async function authenticate(): Promise<void> {
    const data: AuthenticationResponse | undefined = await callApi<AuthenticationResponse>('get', '/auth');

    if (data) {
      await readUser(data.email);
    }

    if (!data) {
      await router.replace({
        name: RouteNames.Home,
      });
    }
  }

  return {
    httpError,
    httpLoading,
    login,
    logout,
    authenticate,
  };
}

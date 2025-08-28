import type { RegistrationRequestDto } from '../types';
import { useApi } from '@/modules/http/composables';
import type { HttpStates } from '@/modules/http/types';

interface UseRegistrationReturn extends HttpStates {
  register: (body: RegistrationRequestDto) => Promise<void>;
}

export function useRegistration(): UseRegistrationReturn {
  const {
    isError,
    isLoading,
    callApi,
  } = useApi();

  async function register(body: RegistrationRequestDto): Promise<void> {
    await callApi<void>(
      'post',
      '/registration',
      body,
    );
  }

  return {
    isError,
    isLoading,
    register,
  };
}

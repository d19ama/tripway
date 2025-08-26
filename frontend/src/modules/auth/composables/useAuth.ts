import {
  type Ref,
  ref,
} from 'vue';
import type { SignInRequestDto } from '../types';
import { useHttpService } from '@/modules/http';

interface UseAuthReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  signIn: (body: SignInRequestDto) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const {
    fetch,
  } = useHttpService();

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function signIn(body: SignInRequestDto): Promise<void> {
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
    signIn,
  };
}

import {
  type Ref,
  ref,
} from 'vue';
import type { SignInRequestDto } from '../types';
import { useHttpService } from '@/modules/http';

interface UseAuthReturn {
  // variables
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;

  // methods
  signIn: (body: SignInRequestDto) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const {
    fetch,
  } = useHttpService();

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function signIn(body: SignInRequestDto): Promise<void> {
    const {
      data,
      error,
    } = await fetch('/auth/login').post(body).json();

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      console.log(data.value);
    }
  }

  return {
    // variables
    isError,
    isLoading,

    // methods
    signIn,
  };
}

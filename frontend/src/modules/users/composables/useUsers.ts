import {
  type ComputedRef,
  type Ref,
  computed,
  ref,
} from 'vue';
import { useHttpService } from '@/modules/http';
import type { UserEntity } from '@/modules/users';

interface UseUsersReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  user: ComputedRef<UserEntity | undefined>;
  readUser: () => Promise<void>;
}

const _user = ref<UserEntity | undefined>();

export function useUsers(): UseUsersReturn {
  const {
    fetch,
  } = useHttpService();

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const user = computed<UserEntity | undefined>(() => {
    return _user.value;
  });

  async function readUser(): Promise<void> {
    isLoading.value = true;

    const {
      data,
      error,
    } = await fetch<UserEntity>(`/users`).get().json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      _user.value = data.value;
    }
  }

  return {
    user,
    isError,
    isLoading,
    readUser,
  };
}

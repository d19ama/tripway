import {
  type ComputedRef,
  type Ref,
  computed,
  ref,
} from 'vue';
import { api } from '@/modules/http';
import type { UserEntity } from '@/modules/users';

interface UseUsersReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  user: ComputedRef<UserEntity | undefined>;
  readUser: (email: UserEntity['email']) => Promise<void>;
}

const _user = ref<UserEntity | undefined>();

export function useUsers(): UseUsersReturn {
  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const user = computed<UserEntity | undefined>(() => {
    return _user.value;
  });

  async function readUser(email: UserEntity['email']): Promise<void> {
    isLoading.value = true;

    const {
      data,
    } = await api.post<UserEntity>(`/users`, {
      body: {
        email,
      },
    });

    isLoading.value = false;

    if (!data) {
      isError.value = true;
      return;
    }

    if (data) {
      _user.value = data;
    }
  }

  return {
    user,
    isError,
    isLoading,
    readUser,
  };
}

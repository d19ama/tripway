import {
  type ComputedRef,
  computed,
  ref,
} from 'vue';
import type { UserEntity } from '@/modules/users';
import {
  type HttpStates,
  useApi,
} from '@/modules/http';

interface UseUsersReturn extends HttpStates {
  user: ComputedRef<UserEntity | undefined>;
  isAuthorized: ComputedRef<boolean>;
  readUser: (email: UserEntity['email']) => Promise<void>;
}

const _user = ref<UserEntity | undefined>();

const isAuthorized = computed<boolean>(() => {
  return _user.value !== undefined;
});

export function useUsers(): UseUsersReturn {
  const {
    httpError,
    httpLoading,
    callApi,
  } = useApi();

  const user = computed<UserEntity | undefined>(() => {
    return _user.value;
  });

  async function readUser(email: UserEntity['email']): Promise<void> {
    const data: UserEntity | undefined = await callApi<UserEntity>(
      'post',
      `/users`,
      {
        email,
      },
    );

    if (data) {
      _user.value = data;
    }
  }

  return {
    user,
    isAuthorized,
    httpError,
    httpLoading,
    readUser,
  };
}

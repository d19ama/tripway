import {
  type RemovableRef,
  useStorage,
} from '@vueuse/core';
import {
  type ComputedRef,
  computed,
} from 'vue';
import {
  AUTH_TOKEN_KEY,
  type AuthToken,
} from '../';

interface UseTokenReturn {
  isAuthenticated: ComputedRef<boolean>;
  setToken: (token: AuthToken) => void;
  getToken: () => AuthToken;
  removeToken: () => void;
}

export function useToken(): UseTokenReturn {
  const storage: RemovableRef<AuthToken> = useStorage(AUTH_TOKEN_KEY, '');

  const isAuthenticated = computed<boolean>(() => {
    return storage.value.length > 0;
  });

  function setToken(token: AuthToken): void {
    storage.value = token;
  }

  function getToken(): AuthToken {
    return storage.value;
  }

  function removeToken(): void {
    storage.value = '';
  }

  return {
    isAuthenticated,
    setToken,
    getToken,
    removeToken,
  };
}

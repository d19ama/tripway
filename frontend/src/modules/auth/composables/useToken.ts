import {
  type RemovableRef,
  useStorage,
} from '@vueuse/core';
import {
  AUTH_TOKEN_KEY,
  type AuthToken,
} from '../';

interface UseTokenReturn {
  setToken: (token: AuthToken) => void;
  getToken: () => AuthToken;
  removeToken: () => void;
}

export function useToken(): UseTokenReturn {
  const storage: RemovableRef<AuthToken> = useStorage(AUTH_TOKEN_KEY, '');

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
    setToken,
    getToken,
    removeToken,
  };
}

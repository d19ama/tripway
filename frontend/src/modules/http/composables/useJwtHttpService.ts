import {
  type UseFetchOptions,
  createFetch,
  type useFetch,
} from '@vueuse/core';
import { useToken } from '@/modules/auth';

interface UseJwtHttpServiceArgs {
  baseUrl?: string;
  headers?: HeadersInit;
  options?: UseFetchOptions;
  fetchOptions?: RequestInit;
}

interface UseJwtHttpServiceReturn {
  fetch: typeof useFetch;
}

const DEFAULT_ARGS: UseJwtHttpServiceArgs = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
};

export function useJwtHttpService({
  baseUrl,
  options,
  headers,
  fetchOptions,
}: UseJwtHttpServiceArgs = DEFAULT_ARGS): UseJwtHttpServiceReturn {
  const {
    getToken,
  } = useToken();

  const fetch: typeof useFetch = createFetch({
    baseUrl,
    combination: 'chain',
    fetchOptions: {
      mode: 'cors',
      ...fetchOptions,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...headers,
      },
    },
    options,
  });

  return {
    fetch,
  };
}

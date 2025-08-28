import {
  type UseFetchOptions,
  createFetch,
  type useFetch,
} from '@vueuse/core';

interface UseHttpServiceArgs {
  baseUrl?: string;
  options?: UseFetchOptions;
  fetchOptions?: RequestInit;
}

interface UseHttpServiceReturn {
  fetch: typeof useFetch;
}

const DEFAULT_ARGS: UseHttpServiceArgs = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
};

export function useHttpService({
  baseUrl,
  options,
  fetchOptions,
}: UseHttpServiceArgs = DEFAULT_ARGS): UseHttpServiceReturn {
  const fetch: typeof useFetch = createFetch({
    baseUrl,
    combination: 'chain',
    fetchOptions: {
      mode: 'cors',
      ...fetchOptions,
    },
    options,
  });

  return {
    fetch,
  };
}

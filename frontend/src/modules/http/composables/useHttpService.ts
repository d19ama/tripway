import {
  type UseFetchOptions,
  createFetch,
  type useFetch,
} from '@vueuse/core';

interface UseHttpServiceReturn {
  fetch: typeof useFetch;
}

export function useHttpService(options?: UseFetchOptions): UseHttpServiceReturn {
  const fetch: typeof useFetch = createFetch({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    combination: 'chain',
    fetchOptions: {
      mode: 'cors',
    },
    options,
  });

  return {
    fetch,
  };
}

import { ref } from 'vue';
import type {
  HttpMethods,
  HttpStates,
} from '../types';
import { api } from '../api';

interface UseApiReturn extends HttpStates {
  callApi: <T>(method: HttpMethods, url: string, data?: any) => Promise<T | undefined>;
}

export function useApi(): UseApiReturn {
  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function callApi<T>(
    method: HttpMethods,
    url: string,
    data?: any,
  ): Promise<T | undefined> {
    try {
      isLoading.value = true;
      isError.value = false;

      const response = await api[method](url, data);

      return response.data;
    } catch (err: any) {
      isError.value = true;
      return undefined;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isError,
    isLoading,
    callApi,
  };
}

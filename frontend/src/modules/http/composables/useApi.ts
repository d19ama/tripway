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
  const httpError = ref<boolean>(false);
  const httpLoading = ref<boolean>(false);

  async function callApi<T>(
    method: HttpMethods,
    url: string,
    data?: any,
  ): Promise<T | undefined> {
    try {
      httpLoading.value = true;
      httpError.value = false;

      const response = await api[method](url, data);

      return response.data;
    } catch (err: any) {
      httpError.value = true;
      return undefined;
    } finally {
      httpLoading.value = false;
    }
  }

  return {
    httpError,
    httpLoading,
    callApi,
  };
}

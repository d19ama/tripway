import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useRouter } from 'vue-router';
import {
  type AuthToken,
  useToken,
} from '@/modules/auth';
import { RouteNames } from '@/app/router/route-names';

const router = useRouter();

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const {
    getToken,
  } = useToken();

  const token: AuthToken = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    const {
      removeToken,
    } = useToken();

    removeToken();

    router.replace({
      name: RouteNames.Home,
    });
  }

  return Promise.reject(error);
});

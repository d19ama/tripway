import {
  type Ref,
  ref,
} from 'vue';
import axios, { type AxiosInstance } from 'axios';
import type { HttpStates } from '@/modules/http/types';

interface UseGeoReturn extends HttpStates {
  cities: Ref<any[]>;
  countries: Ref<any[]>;
  getCountry: (country: string) => Promise<void>;
  getCity: (city: string, country: string) => Promise<void>;
}

const COMMON_PARAMS = {
  'format': 'json',
  'accept-language': 'ru',
};

export function useGeo(): UseGeoReturn {
  const httpError = ref<boolean>(false);
  const httpLoading = ref<boolean>(false);

  const api: AxiosInstance = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const cities = ref<any[]>([]);
  const countries = ref<any[]>([]);

  async function getCountry(country: string): Promise<void> {
    try {
      httpLoading.value = true;
      httpError.value = false;

      const response = await api.get<any>('search', {
        params: {
          ...COMMON_PARAMS,
          country,
          featureType: 'country',
        },
      });

      countries.value = response.data;
    } catch (err: any) {
      httpError.value = true;
    } finally {
      httpLoading.value = false;
    }
  }

  async function getCity(city: string, country: string): Promise<void> {
    try {
      httpLoading.value = true;
      httpError.value = false;

      const response = await api.get<any>('search', {
        params: {
          ...COMMON_PARAMS,
          city,
          country,
          featureType: 'city',
        },
      });

      cities.value = response.data;
    } catch (err: any) {
      httpError.value = true;
    } finally {
      httpLoading.value = false;
    }
  }

  return {
    httpError,
    httpLoading,
    cities,
    countries,
    getCity,
    getCountry,
  };
}

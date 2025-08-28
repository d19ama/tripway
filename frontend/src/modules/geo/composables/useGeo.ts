import {
  type Ref,
  ref,
} from 'vue';
import type { GEO_ISO2 } from '../types';
import type { HttpStates } from '@/modules/http/types';
import { useApi } from '@/modules/http/composables';

interface UseGeoReturn extends HttpStates {
  country: Ref<object>;
  countries: Ref<object[]>;
  getCountry: (iso2: GEO_ISO2) => Promise<void>;
  getCountries: () => Promise<void>;
  getCities: (iso2: GEO_ISO2) => Promise<void>;
}

export function useGeo(): UseGeoReturn {
  const config = {
    headers: {
      'X-CSCAPI-KEY': import.meta.env.VITE_GEO_API_KEY,
    },
  };

  const {
    httpError,
    httpLoading,
    callApi,
  } = useApi();

  const country = ref<any>({});
  const countries = ref<any[]>([]);

  const cities = ref<any[]>([]);

  async function getCountries(): Promise<void> {
    const data: any[] | undefined = await callApi<any[]>(
      'get',
      '/countries',
      config,
    );

    if (data) {
      countries.value = data;
    }
  }

  async function getCountry(iso2: GEO_ISO2): Promise<void> {
    const data: any | undefined = await callApi<any>(
      'get',
      `/countries/${iso2}`,
      config,
    );

    if (data) {
      country.value = data;
    }
  }

  async function getCities(iso2: GEO_ISO2): Promise<void> {
    const data: any | undefined = await callApi(
      'get',
      `/countries/${iso2}/cities`,
      config,
    );

    if (data) {
      cities.value = data;
    }
  }

  return {
    httpError,
    httpLoading,
    country,
    countries,
    getCountry,
    getCountries,
    getCities,
  };
}

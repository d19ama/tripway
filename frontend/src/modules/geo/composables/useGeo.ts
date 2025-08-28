import {
  type Ref,
  ref,
} from 'vue';
import type { GEO_ISO2 } from '../types';
import { api } from '@/modules/http';

interface UseGeoReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
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

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const country = ref<object>({});
  const countries = ref<object[]>([]);

  const cities = ref<object[]>([]);

  async function getCountries(): Promise<void> {
    isLoading.value = true;

    const {
      data,
    } = await api.get('/countries', config);

    isLoading.value = false;

    if (!data) {
      isError.value = true;
      return;
    }

    if (data) {
      countries.value = data;
    }
  }

  async function getCountry(iso2: GEO_ISO2): Promise<void> {
    isLoading.value = true;

    const {
      data,
    } = await api.get(`/countries/${iso2}`, config);

    isLoading.value = false;

    if (!data) {
      isError.value = true;
      return;
    }

    if (data) {
      country.value = data;
    }
  }

  async function getCities(iso2: GEO_ISO2): Promise<void> {
    isLoading.value = true;

    const {
      data,
    } = await api.get(`/countries/${iso2}/cities`, config);

    isLoading.value = false;

    if (!data) {
      isError.value = true;
      return;
    }

    if (data) {
      cities.value = data;
    }
  }

  return {
    isError,
    isLoading,
    country,
    countries,
    getCountry,
    getCountries,
    getCities,
  };
}

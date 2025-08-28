import {
  type Ref,
  ref,
} from 'vue';
import { useHttpService } from '@/modules/http';
import type { GEO_ISO2 } from '@/modules/geo/types';

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
  const {
    fetch,
  } = useHttpService({
    baseUrl: import.meta.env.VITE_GEO_API_BASE_URL,
    fetchOptions: {
      headers: {
        'X-CSCAPI-KEY': import.meta.env.VITE_GEO_API_KEY,
      },
    },
  });

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const country = ref<object>({});
  const countries = ref<object[]>([]);

  const cities = ref<object[]>([]);

  async function getCountries(): Promise<void> {
    isLoading.value = true;

    const {
      data,
      error,
    } = await fetch('/countries').get().json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      countries.value = data.value;
    }
  }

  async function getCountry(iso2: GEO_ISO2): Promise<void> {
    isLoading.value = true;

    const {
      data,
      error,
    } = await fetch(`/countries/${iso2}`).get().json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      country.value = data.value;
    }
  }

  async function getCities(iso2: GEO_ISO2): Promise<void> {
    isLoading.value = true;

    const {
      data,
      error,
    } = await fetch(`/countries/${iso2}/cities`).get().json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      cities.value = data.value;
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

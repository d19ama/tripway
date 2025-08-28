import {
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import type { RouteEntity } from '../';
import { DEFAULT_ROUTE } from '../constants';
import { api } from '@/modules/http';

interface UseRoutesReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  activeRoute: Ref<RouteEntity | undefined>;
  routes: WritableComputedRef<RouteEntity[]>;
  readRoutes: () => Promise<void>;
  readRoute: (id: RouteEntity['id']) => Promise<void>;
  deleteRoute: (id: RouteEntity['id']) => Promise<void>;
  updateRoute: (id: RouteEntity['id'], route: Partial<RouteEntity>) => Promise<void>;
  createRoute: (name: RouteEntity['name']) => Promise<RouteEntity['id'] | undefined>;
}

const _routes = ref<RouteEntity[]>([]);

export function useRoutes(): UseRoutesReturn {
  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const activeRoute = ref<RouteEntity | undefined>();

  const routes = computed<RouteEntity[]>({
    get() {
      return _routes.value;
    },
    set(value) {
      _routes.value = value;
    },
  });

  async function readRoutes(): Promise<void> {
    isLoading.value = true;

    const {
      data,
    } = await api.get<RouteEntity[]>('/routes');

    isLoading.value = false;

    if (!data) {
      isError.value = true;
      return;
    }

    if (data) {
      _routes.value = data;
    }
  }

  async function createRoute(name: RouteEntity['name']): Promise<RouteEntity['id'] | undefined> {
    isLoading.value = true;

    const {
      data,
    } = await api.post<RouteEntity>('/routes', {
      body: {
        ...DEFAULT_ROUTE,
        name,
      },
    });

    isLoading.value = false;

    if (!data) {
      isError.value = true;
      return;
    }

    if (data) {
      return data.id;
    }
  }

  async function readRoute(id: RouteEntity['id']): Promise<void> {
    isLoading.value = true;

    const {
      data,
    } = await api.get<RouteEntity>(`/routes/${id}`);

    isLoading.value = false;

    if (!data) {
      isError.value = true;
      return;
    }

    if (data) {
      activeRoute.value = data;
      _routes.value = [
        {
          ...data,
          opened: true,
        },
      ];
    }
  }

  async function updateRoute(id: RouteEntity['id'], route: Partial<RouteEntity>): Promise<void> {
    isLoading.value = true;

    const response = await api.patch<void>(`/routes/${id}`, route);

    isLoading.value = false;

    if (response.status !== 200) {
      isError.value = true;
    }
  }

  async function deleteRoute(id: RouteEntity['id']): Promise<void> {
    isLoading.value = true;

    const response = await api.delete<void>(`/routes/${id}`);

    isLoading.value = false;

    if (response.status !== 200) {
      isError.value = true;
    }
  }

  return {
    routes,
    isError,
    isLoading,
    activeRoute,
    readRoute,
    readRoutes,
    updateRoute,
    createRoute,
    deleteRoute,
  };
}

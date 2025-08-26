import {
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import type { RouteEntity } from '../';
import { DEFAULT_ROUTE } from '../constants';
import { useHttpService } from '@/modules/http';

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
  const {
    fetch,
  } = useHttpService();

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
      error,
    } = await fetch<RouteEntity[]>('/routes').get().json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      _routes.value = data.value;
    }
  }

  async function createRoute(name: RouteEntity['name']): Promise<RouteEntity['id'] | undefined> {
    isLoading.value = true;

    const {
      data,
      error,
    } = await fetch<RouteEntity>('/routes').post({
      ...DEFAULT_ROUTE,
      name,
    }).json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      return data.value.id;
    }
  }

  async function readRoute(id: RouteEntity['id']): Promise<void> {
    isLoading.value = true;

    const {
      data,
      error,
    } = await fetch<RouteEntity>(`/routes/${id}`).get().json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      activeRoute.value = data.value;
      _routes.value = [
        {
          ...data.value,
          opened: true,
        },
      ];
    }
  }

  async function updateRoute(id: RouteEntity['id'], route: Partial<RouteEntity>): Promise<void> {
    isLoading.value = true;

    const {
      error,
    } = await fetch<void>(`/routes/${id}`).patch(route);

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
    }
  }

  async function deleteRoute(id: RouteEntity['id']): Promise<void> {
    isLoading.value = true;

    const {
      error,
    } = await fetch<void>(`/routes/${id}`).delete();

    isLoading.value = false;

    if (error.value) {
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

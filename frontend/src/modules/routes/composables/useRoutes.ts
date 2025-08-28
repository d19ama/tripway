import {
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import type { RouteEntity } from '../';
import { DEFAULT_ROUTE } from '../constants';
import {
  type HttpStates,
  useApi,
} from '@/modules/http';

interface UseRoutesReturn extends HttpStates {
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
    isError,
    isLoading,
    callApi,
  } = useApi();

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
    const data: RouteEntity[] | undefined = await callApi<RouteEntity[]>('get', '/routes');

    if (data) {
      _routes.value = data;
    }
  }

  async function createRoute(name: RouteEntity['name']): Promise<RouteEntity['id'] | undefined> {
    const data: RouteEntity | undefined = await callApi<RouteEntity>(
      'post',
      '/routes',
      {
        ...DEFAULT_ROUTE,
        name,
      },
    );

    if (data) {
      return data.id;
    }
  }

  async function readRoute(id: RouteEntity['id']): Promise<void> {
    const data: RouteEntity | undefined = await callApi<RouteEntity>('get', `/routes/${id}`);

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
    await callApi<void>(
      'patch',
      `/routes/${id}`,
      route,
    );
  }

  async function deleteRoute(id: RouteEntity['id']): Promise<void> {
    await callApi<void>('delete', `/routes/${id}`);
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

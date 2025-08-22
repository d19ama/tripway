import {
  type ComputedRef,
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import type { RouteEntity } from '../';
import { DEFAULT_ROUTE } from '../constants';
import { useHttpService } from '@/modules/http';

interface UseRoutesReturn {
  // variables
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  activeRoute: Ref<RouteEntity | undefined>;
  routes: WritableComputedRef<RouteEntity[]>;
  selectedRoutes: ComputedRef<RouteEntity[]>;

  // requests
  readRoutes: () => Promise<void>;
  readRoute: (id: RouteEntity['id']) => Promise<void>;
  deleteRoute: (id: RouteEntity['id']) => Promise<void>;
  updateRoute: (id: RouteEntity['id'], route: Partial<RouteEntity>) => Promise<void>;
  createRoute: (name: RouteEntity['name']) => Promise<RouteEntity['id'] | undefined>;
}

const _routes = ref<RouteEntity[]>([]);

export function useRoutes(): UseRoutesReturn {
  const httpService = useHttpService();

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

  const selectedRoutes = computed<RouteEntity[]>(() => {
    return _routes.value.filter((item: RouteEntity) => {
      return item.opened;
    });
  });

  async function readRoutes(): Promise<void> {
    isLoading.value = true;

    const response = await httpService.getData<RouteEntity[]>('/routes');

    isLoading.value = false;

    if (!response) {
      isError.value = true;
      return;
    }

    if (response) {
      _routes.value = response;
    }
  }

  async function createRoute(name: RouteEntity['name']): Promise<RouteEntity['id'] | undefined> {
    isLoading.value = true;

    const response = await httpService.postData<RouteEntity>('/routes', {
      ...DEFAULT_ROUTE,
      name,
    });

    isLoading.value = false;

    if (!response) {
      isError.value = true;
      return;
    }

    if (response) {
      return response.id;
    }
  }

  async function readRoute(id: RouteEntity['id']): Promise<void> {
    isLoading.value = true;

    const response = await httpService.getData<RouteEntity>(`/routes/${id}`);

    isLoading.value = false;

    if (!response) {
      isError.value = true;
      return;
    }

    if (response) {
      activeRoute.value = response;
    }
  }

  async function updateRoute(id: RouteEntity['id'], route: Partial<RouteEntity>): Promise<void> {
    isLoading.value = true;

    const response = await httpService.patchData<RouteEntity>(`/routes/${id}`, {
      ...route,
    });

    isLoading.value = false;

    if (!response) {
      isError.value = true;
    }
  }

  async function deleteRoute(id: RouteEntity['id']): Promise<void> {
    isLoading.value = true;

    const response = await httpService.deleteData(`/routes/${id}`);

    isLoading.value = false;

    if (!response) {
      isError.value = true;
    }
  }

  return {
    // variables
    routes,
    isError,
    isLoading,
    activeRoute,
    selectedRoutes,

    // requests
    readRoute,
    readRoutes,
    updateRoute,
    createRoute,
    deleteRoute,
  };
}

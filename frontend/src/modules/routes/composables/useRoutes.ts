import {
  type ComputedRef,
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import type { RouteEntity } from '../';
import { DEFAULT_ROUTE } from '../constants';
import { RouteNames } from '@/app/router/route-names';
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
  createRoute: (name: RouteEntity['name']) => Promise<RouteEntity['id'] | undefined>;

  // route actions
  editRoute: (id: RouteEntity['id']) => void;
  removeRoute: (id: RouteEntity['id']) => void;
  openRoute: (id: RouteEntity['id']) => void;
  closeRoute: (id: RouteEntity['id']) => void;
  closeAllRoutes: () => void;
}

const _routes = ref<RouteEntity[]>([]);

export function useRoutes(): UseRoutesReturn {
  const router = useRouter();
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

  async function deleteRoute(id: RouteEntity['id']): Promise<void> {
    isLoading.value = true;

    const response = await httpService.deleteData(`/routes/${id}`);

    isLoading.value = false;

    if (!response) {
      isError.value = true;
    }
  }

  function toggleRouteOpened(id: RouteEntity['id'], opened: boolean) {
    _routes.value = _routes.value.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          opened,
        };
      }

      return item;
    });
  }

  async function openRoute(id: RouteEntity['id']): Promise<void> {
    toggleRouteOpened(id, true);

    await router.push({
      name: RouteNames.RoutePage,
      params: {
        id,
      },
    });
  }

  async function closeRoute(id: RouteEntity['id']): Promise<void> {
    toggleRouteOpened(id, false);

    const nextRoute: RouteEntity | undefined = selectedRoutes.value[selectedRoutes.value.length - 1];

    if (nextRoute) {
      await router.replace({
        name: RouteNames.RoutePage,
        params: {
          id: nextRoute.id,
        },
      });
      return;
    }

    await router.replace({
      name: RouteNames.RoutesList,
    });
  }

  async function closeAllRoutes(): Promise<void> {
    _routes.value.forEach((item) => {
      toggleRouteOpened(item.id, false);
    });

    await router.replace({
      name: RouteNames.RoutesList,
    });
  }

  async function removeRoute(id: RouteEntity['id']): Promise<void> {
    _routes.value = _routes.value.filter((item) => {
      return item.id !== id;
    });

    await router.replace({
      name: RouteNames.RoutesList,
    });
  }

  async function editRoute(id: RouteEntity['id']): Promise<void> {
    const currentRoute: RouteEntity | undefined = _routes.value.find((item) => {
      return item.id === id;
    });

    if (currentRoute) {
      currentRoute.state = 'edit';
      currentRoute.opened = true;
    }

    await router.replace({
      name: RouteNames.RoutePage,
      params: {
        id,
      },
    });
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
    createRoute,
    deleteRoute,

    // route actions
    editRoute,
    removeRoute,
    openRoute,
    closeRoute,
    closeAllRoutes,
  };
}

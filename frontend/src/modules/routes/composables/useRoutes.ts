import {
  type ComputedRef,
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import type { Route } from '../';
import { DEFAULT_ROUTE } from '../constants';
import type { RouteSection } from '../types';
import { RouteNames } from '@/app/router/route-names';
import { useHttpService } from '@/modules/http';

interface UseRoutesReturn {
  // variables
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  activeRoute: Ref<Route | undefined>;
  routes: WritableComputedRef<Route[]>;
  selectedRoutes: ComputedRef<Route[]>;

  // requests
  readRoutes: () => Promise<void>;
  readRoute: (id: Route['id']) => Promise<void>;
  deleteRoute: (id: Route['id']) => Promise<void>;
  createRoute: (name: Route['name']) => Promise<Route['id'] | undefined>;

  // route actions
  editRoute: (id: Route['id']) => void;
  removeRoute: (id: Route['id']) => void;
  openRoute: (id: Route['id']) => void;
  closeRoute: (id: Route['id']) => void;
  closeAllRoutes: () => void;

  // route section actions
  addRouteSection: (id: Route['id'], routeSection: RouteSection) => void;
}

const _routes = ref<Route[]>([]);

export function useRoutes(): UseRoutesReturn {
  const router = useRouter();
  const httpService = useHttpService();

  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const activeRoute = ref<Route | undefined>();

  const routes = computed<Route[]>({
    get() {
      return _routes.value;
    },
    set(value) {
      _routes.value = {
        ...value,
      };
    },
  });

  const selectedRoutes = computed<Route[]>(() => {
    return _routes.value.filter((item: Route) => {
      return item.opened;
    });
  });

  async function readRoutes(): Promise<void> {
    isLoading.value = true;

    const response = await httpService.getData<Route[]>('/routes');

    isLoading.value = false;

    if (!response) {
      isError.value = true;
      return;
    }

    if (response) {
      _routes.value = response;
    }
  }

  async function createRoute(name: Route['name']): Promise<Route['id'] | undefined> {
    isLoading.value = true;

    const response = await httpService.postData<Route>('/routes', {
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

  async function readRoute(id: Route['id']): Promise<void> {
    isLoading.value = true;

    const response = await httpService.getData<Route>(`/routes/${id}`);

    isLoading.value = false;

    if (!response) {
      isError.value = true;
      return;
    }

    if (response) {
      activeRoute.value = response;
    }
  }

  async function deleteRoute(id: Route['id']): Promise<void> {
    isLoading.value = true;

    const response = await httpService.deleteData(`/routes/${id}`);

    isLoading.value = false;

    if (!response) {
      isError.value = true;
    }
  }

  function toggleRouteOpened(id: Route['id'], opened: boolean) {
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

  async function openRoute(id: Route['id']): Promise<void> {
    toggleRouteOpened(id, true);

    await router.push({
      name: RouteNames.RoutePage,
      params: {
        id,
      },
    });
  }

  async function closeRoute(id: Route['id']): Promise<void> {
    toggleRouteOpened(id, false);

    const nextRoute: Route | undefined = selectedRoutes.value[selectedRoutes.value.length - 1];

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

  async function removeRoute(id: Route['id']): Promise<void> {
    _routes.value = _routes.value.filter((item) => {
      return item.id !== id;
    });

    await router.replace({
      name: RouteNames.RoutesList,
    });
  }

  function addRouteSection(id: Route['id'], routeSection: RouteSection): void {
    const currentRoute: Route | undefined = _routes.value.find((item) => {
      return item.id === id;
    });

    if (currentRoute) {
      currentRoute.route.push(routeSection);
    }
  }

  async function editRoute(id: Route['id']): Promise<void> {
    const currentRoute: Route | undefined = _routes.value.find((item) => {
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

    // route section actions
    addRouteSection,
  };
}

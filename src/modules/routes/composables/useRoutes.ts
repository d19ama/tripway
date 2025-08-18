import {
  type ComputedRef,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import { MOCKED_ROUTES } from '../mocks';
import type { Route } from '../';
import { DEFAULT_ROUTE } from '../constants';
import type { RouteSection } from '../types';
import { RouteNames } from '@/app/router/route-names';

interface UseRoutesReturn {
  // variables
  routes: WritableComputedRef<Route[]>;
  activeRoute: ComputedRef<Route | undefined>;
  selectedRoutes: ComputedRef<Route[]>;

  // requests
  readRoutes: () => void;

  // route actions
  addRoute: (name: string) => void;
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
  const route = useRoute();
  const router = useRouter();

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

  const activeRoute = computed<Route | undefined>(() => {
    return routes.value.find((item) => {
      return item.id === String(route.params.id);
    });
  });

  const selectedRoutes = computed<Route[]>(() => {
    return _routes.value.filter((item: Route) => {
      return item.opened;
    });
  });

  function readRoutes(): void {
    _routes.value = [
      ...MOCKED_ROUTES,
    ];
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

  function openRoute(id: Route['id']): void {
    toggleRouteOpened(id, true);
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

  function addRoute(name: string): void {
    _routes.value.unshift({
      ...DEFAULT_ROUTE,
      name,
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

  function editRoute(id: Route['id']): void {
    const currentRoute: Route | undefined = _routes.value.find((item) => {
      return item.id === id;
    });

    if (currentRoute) {
      currentRoute.state = 'edit';
    }
  }

  return {
    // variables
    routes,
    activeRoute,
    selectedRoutes,

    // requests
    readRoutes,

    // route actions
    addRoute,
    editRoute,
    removeRoute,
    openRoute,
    closeRoute,
    closeAllRoutes,

    // route section actions
    addRouteSection,
  };
}

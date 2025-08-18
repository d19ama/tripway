import {
  type ComputedRef,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { MOCKED_ROUTES } from '../mocks';
import type { Route } from '../';
import { DEFAULT_ROUTE } from '../constants';
import type { RouteSection } from '../types';

interface UseRoutesReturn {
  // variables
  routes: WritableComputedRef<Route[]>;
  activeRoute: ComputedRef<Route | undefined>;

  // requests
  readRoutes: () => void;

  // route actions
  addRoute: (name: string) => void;
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
  }

  async function closeAllRoutes(): Promise<void> {
    _routes.value.forEach((item) => {
      toggleRouteOpened(item.id, false);
    });
  }

  function addRoute(name: string): void {
    _routes.value.unshift({
      ...DEFAULT_ROUTE,
      name,
    });
  }

  function removeRoute(id: Route['id']): void {
    _routes.value = _routes.value.filter((item) => {
      return item.id === id;
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

  return {
    // variables
    routes,
    activeRoute,

    // requests
    readRoutes,

    // route actions
    addRoute,
    removeRoute,
    openRoute,
    closeRoute,
    closeAllRoutes,

    // route section actions
    addRouteSection,
  };
}

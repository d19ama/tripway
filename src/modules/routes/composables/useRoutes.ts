import {
  type ComputedRef,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { MOCKED_ROUTES } from '../mocks';
import type { Route } from '../';

interface UseRoutesReturn {
  getRoutes: () => void;
  activeRoute: ComputedRef<Route | undefined>;
  routes: WritableComputedRef<Route[]>;
  openRoute: (id: Route['id']) => void;
  closeRoute: (id: Route['id']) => void;
  closeAllRoutes: () => void;
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

  function getRoutes(): void {
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

  return {
    routes,
    activeRoute,
    getRoutes,
    openRoute,
    closeRoute,
    closeAllRoutes,
  };
}

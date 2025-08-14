import {
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import { MOCKED_ROUTES } from '../mocks';
import type { Route } from '../';
import { RouteNames } from '@/app/router/route-names';

interface UseRoutesReturn {
  getRoutes: () => void;
  routes: WritableComputedRef<Route[]>;
  openRoute: (id: Route['id']) => void;
  closeRoute: (id: Route['id']) => void;
  closeAllRoutes: () => void;
}

const _routes = ref<Route[]>([]);

export function useRoutes(): UseRoutesReturn {
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

  function getRoutes(): void {
    _routes.value = [
      ...MOCKED_ROUTES,
    ];
  }

  function toggleOpenRoute(id: Route['id'], opened: boolean) {
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
    toggleOpenRoute(id, true);

    router.push({
      name: RouteNames.RoutePage,
      params: {
        id,
      },
    });
  }

  function closeRoute(id: Route['id']): void {
    toggleOpenRoute(id, false);
  }

  function closeAllRoutes(): void {
    _routes.value.forEach((item) => {
      toggleOpenRoute(item.id, false);
    });
  }

  return {
    routes,
    getRoutes,
    openRoute,
    closeRoute,
    closeAllRoutes,
  };
}

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
import { RouteNames } from '@/app/router/route-names';

interface UseRoutesReturn {
  getRoutes: () => void;
  activeRoute: ComputedRef<Route | undefined>;
  routes: WritableComputedRef<Route[]>;
  openRoute: (id: Route['id']) => void;
  closeRoute: (id: Route['id']) => void;
  closeAllRoutes: () => void;
}

const _routes = ref<Route[]>([]);
const _openedRoutesIds = ref<Route['id'][]>([]);

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

    _openedRoutesIds.value.push(id);

    router.push({
      name: RouteNames.RoutePage,
      params: {
        id,
      },
    });
  }

  async function closeRoute(id: Route['id']): Promise<void> {
    toggleOpenRoute(id, false);

    _openedRoutesIds.value = _openedRoutesIds.value.filter((item) => {
      return item !== id;
    });

    if (_openedRoutesIds.value.length > 0) {
      await router.replace({
        name: RouteNames.RoutePage,
        params: {
          id: _openedRoutesIds.value[_openedRoutesIds.value.length - 1],
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
      toggleOpenRoute(item.id, false);
    });

    await router.replace({
      name: RouteNames.RoutesList,
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

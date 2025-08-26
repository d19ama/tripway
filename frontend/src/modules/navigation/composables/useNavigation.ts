import { useRouter } from 'vue-router';
import {
  type ComputedRef,
  computed,
} from 'vue';
import { RouteNames } from '@/app/router/route-names';
import {
  type RouteEntity,
  useRoutes,
} from '@/modules/routes';

interface UseNavigationReturn {
  selectedRoutes: ComputedRef<RouteEntity[]>;
  openRoute: (id: RouteEntity['id']) => void;
  closeRoute: (id: RouteEntity['id']) => void;
  closeAllRoutes: () => void;
}

export function useNavigation(): UseNavigationReturn {
  const router = useRouter();

  const {
    routes,
  } = useRoutes();

  const selectedRoutes = computed<RouteEntity[]>(() => {
    return routes.value.filter((item: RouteEntity) => {
      return item.opened;
    });
  });

  function toggleRouteOpened(id: RouteEntity['id'], opened: boolean) {
    routes.value = routes.value.map((item) => {
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
    routes.value.forEach((item) => {
      toggleRouteOpened(item.id, false);
    });

    await router.replace({
      name: RouteNames.RoutesList,
    });
  }

  return {
    selectedRoutes,
    openRoute,
    closeRoute,
    closeAllRoutes,
  };
}

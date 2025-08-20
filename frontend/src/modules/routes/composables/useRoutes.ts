import {
  type ComputedRef,
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import type { Route } from '../';
import type { RouteSection } from '../types';
import { RouteNames } from '@/app/router/route-names';

interface UseRoutesReturn {
  // variables
  isError: Ref<boolean>;
  routes: WritableComputedRef<Route[]>;
  activeRoute: ComputedRef<Route | undefined>;
  selectedRoutes: ComputedRef<Route[]>;

  // requests
  readRoutes: () => Promise<void>;
  createRoute: (name: Route['name']) => Promise<void>;

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
  const route = useRoute();
  const router = useRouter();

  const isError = ref<boolean>(false);

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

  async function readRoutes(): Promise<void> {
    const response = await fetch('http://localhost:3000/api/v1/routes', {
      method: 'GET',
    });

    if (!response.ok) {
      isError.value = true;
    }

    if (response.ok) {
      _routes.value = await response.json();
    }

    // _routes.value = [
    //   ...MOCKED_ROUTES,
    // ];
  }

  async function createRoute(name: Route['name']): Promise<void> {
    const response: Response = await fetch('http://localhost:3000/api/v1/routes/_create', {
      method: 'POST',
      body: JSON.stringify({
        id: '1234567890',
        name,
        startDate: '2025-08-20T12:44:11.539Z',
        endDate: '2025-08-20T12:44:11.539Z',
        costs: 0,
        opened: false,
        active: false,
        state: 'new',
      }),
    });

    if (!response.ok) {
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
    activeRoute,
    selectedRoutes,

    // requests
    readRoutes,
    createRoute,

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

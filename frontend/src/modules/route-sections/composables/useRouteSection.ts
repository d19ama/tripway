import {
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import type { RouteEntity } from '@/modules/routes';
import type { RouteSectionEntity } from '@/modules/route-sections';
import type { HttpStates } from '@/modules/http/types';
import { useApi } from '@/modules/http/composables';

interface UseRouteSectionReturn extends HttpStates {
  routeSections: WritableComputedRef<RouteSectionEntity[]>;
  readRouteSections: (routeId: RouteEntity['id']) => Promise<void>;
  createRouteSection: (routeId: RouteEntity['id'], routeSection: RouteSectionEntity) => Promise<void>;
}

const _routeSections = ref<RouteSectionEntity[]>([]);

export function useRouteSection(): UseRouteSectionReturn {
  const {
    isError,
    isLoading,
    callApi,
  } = useApi();

  const routeSections = computed<RouteSectionEntity[]>({
    get() {
      return _routeSections.value;
    },
    set(value) {
      _routeSections.value = value;
    },
  });

  async function readRouteSections(routeId: RouteEntity['id']): Promise<void> {
    const data: RouteSectionEntity[] | undefined = await callApi<RouteSectionEntity[]>('get', `/route-sections/${routeId}`);

    if (data) {
      _routeSections.value = data;
    }
  }

  async function createRouteSection(routeId: RouteEntity['id'], routeSection: RouteSectionEntity): Promise<void> {
    await callApi<RouteSectionEntity>(
      'post',
      '/route-sections',
      {
        ...routeSection,
        routeId,
      },
    );
  }

  return {
    isError,
    isLoading,
    routeSections,
    readRouteSections,
    createRouteSection,
  };
}

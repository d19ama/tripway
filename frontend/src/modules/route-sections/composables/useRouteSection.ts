import {
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import type { RouteEntity } from '@/modules/routes';
import type { RouteSectionEntity } from '@/modules/route-sections';
import { api } from '@/modules/http';

interface UseRouteSectionReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  routeSections: WritableComputedRef<RouteSectionEntity[]>;
  readRouteSections: (routeId: RouteEntity['id']) => Promise<void>;
  createRouteSection: (routeId: RouteEntity['id'], routeSection: RouteSectionEntity) => Promise<void>;
}

const _routeSections = ref<RouteSectionEntity[]>([]);

export function useRouteSection(): UseRouteSectionReturn {
  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const routeSections = computed<RouteSectionEntity[]>({
    get() {
      return _routeSections.value;
    },
    set(value) {
      _routeSections.value = value;
    },
  });

  async function readRouteSections(routeId: RouteEntity['id']): Promise<void> {
    isLoading.value = true;

    const {
      data,
    } = await api.get<RouteSectionEntity[]>(`/route-sections/${routeId}`);

    isLoading.value = false;

    if (!data) {
      isError.value = true;
      return;
    }

    if (data) {
      _routeSections.value = data;
    }
  }

  async function createRouteSection(routeId: RouteEntity['id'], routeSection: RouteSectionEntity): Promise<void> {
    isLoading.value = true;

    const {
      status,
    } = await api.post<RouteSectionEntity>('/route-sections', {
      body: {
        ...routeSection,
        routeId,
      },
    });

    isLoading.value = false;

    if (status !== 200) {
      isError.value = true;
    }
  }

  return {
    isError,
    isLoading,
    routeSections,
    readRouteSections,
    createRouteSection,
  };
}

import {
  type Ref,
  type WritableComputedRef,
  computed,
  ref,
} from 'vue';
import type { RouteEntity } from '@/modules/routes';
import type { RouteSectionEntity } from '@/modules/route-sections';
import { useHttpService } from '@/modules/http';

interface UseRouteSectionReturn {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  routeSections: WritableComputedRef<RouteSectionEntity[]>;
  readRouteSections: (routeId: RouteEntity['id']) => Promise<void>;
  createRouteSection: (routeId: RouteEntity['id'], routeSection: RouteSectionEntity) => Promise<void>;
}

const _routeSections = ref<RouteSectionEntity[]>([]);

export function useRouteSection(): UseRouteSectionReturn {
  const {
    fetch,
  } = useHttpService();

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
      error,
    } = await fetch<RouteSectionEntity[]>(`/route-sections/${routeId}`).get().json();

    isLoading.value = false;

    if (error.value) {
      isError.value = true;
      return;
    }

    if (data.value) {
      _routeSections.value = data.value;
    }
  }

  async function createRouteSection(routeId: RouteEntity['id'], routeSection: RouteSectionEntity): Promise<void> {
    isLoading.value = true;

    const {
      error,
    } = await fetch<RouteSectionEntity>('/route-sections').post({
      ...routeSection,
      routeId,
    }).json();

    isLoading.value = false;

    if (error.value) {
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

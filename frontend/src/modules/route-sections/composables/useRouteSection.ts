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
  // variables
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
  routeSections: WritableComputedRef<RouteSectionEntity[]>;

  // requests
  readRouteSections: (routeId: RouteEntity['id']) => Promise<void>;
  createRouteSection: (routeId: RouteEntity['id'], routeSection: RouteSectionEntity) => Promise<void>;
}

const _routeSections = ref<RouteSectionEntity[]>([]);

export function useRouteSection(): UseRouteSectionReturn {
  const httpService = useHttpService();

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

    const response = await httpService.getData<RouteSectionEntity[]>(`/route-sections/${routeId}`);

    isLoading.value = false;

    if (!response) {
      isError.value = true;
      return;
    }

    if (response) {
      _routeSections.value = response;
    }
  }

  async function createRouteSection(routeId: RouteEntity['id'], routeSection: RouteSectionEntity): Promise<void> {
    isLoading.value = true;

    const response = await httpService.postData<RouteSectionEntity>('/route-sections', {
      ...routeSection,
      routeId,
    });

    isLoading.value = false;

    if (!response) {
      isError.value = true;
    }
  }

  return {
    // variables
    isError,
    isLoading,
    routeSections,

    // requests
    readRouteSections,
    createRouteSection,
  };
}

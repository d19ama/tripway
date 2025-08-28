<script setup lang="ts">
import {
  onMounted,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import {
  CreateRouteModal,
  DeleteRouteConfirmationModal,
  RouteCard,
  type RouteEntity,
  UpdateRouteModal,
  useRoutes,
} from '@/modules/routes';
import {
  AppButton,
  AppPage,
} from '@/common/components';
import { usePageLoadingIndicator } from '@/common/composables';
import { UnknownHttpErrorModal } from '@/modules/http';
import { RouteNames } from '@/app/router/route-names';
import { useNavigation } from '@/modules/navigation';

const {
  routes,
  httpError,
  readRoutes,
} = useRoutes();

const {
  openRoute,
  closeRoute,
} = useNavigation();

const {
  showUntil,
} = usePageLoadingIndicator();

const router = useRouter();

const selectedRouteId = ref<RouteEntity['id']>('');
const selectedRouteName = ref<RouteEntity['name']>('');
const isCreateRouteModalVisible = ref<boolean>(false);
const isUpdateRouteModalVisible = ref<boolean>(false);
const isDeleteConfirmationModalVisible = ref<boolean>(false);

function openCreateRouteModal(): void {
  isCreateRouteModalVisible.value = true;
}

function openUpdateRouteModal({
  id,
  name,
}: Pick<RouteEntity, 'id' | 'name'>): void {
  selectedRouteId.value = id;
  selectedRouteName.value = name;
  isUpdateRouteModalVisible.value = true;
}

function openDeleteRouteModal(id: RouteEntity['id']): void {
  selectedRouteId.value = id;
  isDeleteConfirmationModalVisible.value = true;
}

async function updateRoutes(): Promise<void> {
  await showUntil(readRoutes());
}

async function onRouteCreated(id: RouteEntity['id']): Promise<void> {
  await router.push({
    name: RouteNames.RoutePage,
    params: {
      id,
    },
  });
}

onMounted(async () => {
  await showUntil(readRoutes());
});
</script>

<template>
  <AppPage>
    <template #content>
      <div class="routes-list-page">
        <AppButton
          size="l"
          rounded
          shadow
          theme="yellow"
          @click="openCreateRouteModal"
        >
          <span class="icon icon-plus" />Создать маршрут
        </AppButton>
        <RouteCard
          v-for="item in routes"
          :key="item.id"
          :route="item"
          @close:route="closeRoute"
          @update:route="openUpdateRouteModal"
          @delete:route="openDeleteRouteModal"
          @click="openRoute"
        />
      </div>
    </template>
  </AppPage>

  <CreateRouteModal
    v-model:visible="isCreateRouteModalVisible"
    @create:route:success="onRouteCreated"
  />

  <UpdateRouteModal
    v-model:visible="isUpdateRouteModalVisible"
    :route-id="selectedRouteId"
    :route-name="selectedRouteName"
    @update:route:success="updateRoutes"
  />

  <DeleteRouteConfirmationModal
    v-model:visible="isDeleteConfirmationModalVisible"
    :route-id="selectedRouteId"
    @delete:route:success="updateRoutes"
  />

  <UnknownHttpErrorModal
    v-model:visible="httpError"
  />
</template>

<style lang="scss">
.routes-list-page {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1rem 0;
}
</style>

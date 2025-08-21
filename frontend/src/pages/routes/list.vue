<script setup lang="ts">
import {
  onMounted,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import {
  CreateRouteModal,
  DeleteRouteConfirmationModal,
  type Route,
  RouteCard,
  useRoutes,
} from '@/modules/routes';
import { AppButton } from '@/common/components';
import { usePageLoadingIndicator } from '@/common/composables';
import { UnknownHttpErrorModal } from '@/modules/http';
import { RouteNames } from '@/app/router/route-names';

const {
  routes,
  isError,
  editRoute,
  openRoute,
  closeRoute,
  readRoutes,
} = useRoutes();

const {
  showUntil,
} = usePageLoadingIndicator();

const router = useRouter();

const selectedRouteId = ref<Route['id']>('');
const isCreateRouteModalVisible = ref<boolean>(false);
const isDeleteConfirmationModalVisible = ref<boolean>(false);

function openCreateRouteModal(): void {
  isCreateRouteModalVisible.value = true;
}

function openDeleteRouteModal(id: Route['id']): void {
  selectedRouteId.value = id;
  isDeleteConfirmationModalVisible.value = true;
}

async function onRouteCreated(id: Route['id']): Promise<void> {
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
      @edit:route="editRoute"
      @close:route="closeRoute"
      @delete:route="openDeleteRouteModal"
      @click="openRoute"
    />
  </div>

  <CreateRouteModal
    v-model:visible="isCreateRouteModalVisible"
    @create:route:success="onRouteCreated"
  />

  <DeleteRouteConfirmationModal
    v-model:visible="isDeleteConfirmationModalVisible"
    :route-id="selectedRouteId"
    @delete:route:success="showUntil(readRoutes())"
  />

  <UnknownHttpErrorModal
    v-model:visible="isError"
  />
</template>

<style lang="scss">
.routes-list-page {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1rem;
  width: 640px;
  margin: auto;
}
</style>

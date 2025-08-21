<script setup lang="ts">
import {
  onMounted,
  ref,
} from 'vue';
import {
  CreateRouteModal,
  DeleteRouteConfirmationModal,
  type Route,
  RouteCard,
  useRoutes,
} from '@/modules/routes';
import { AppButton } from '@/common/components';
import { usePageLoadingIndicator } from '@/common/composables';

const {
  routes,
  editRoute,
  openRoute,
  closeRoute,
  readRoutes,
} = useRoutes();

const {
  showUntil,
} = usePageLoadingIndicator();

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
  />

  <DeleteRouteConfirmationModal
    v-model:visible="isDeleteConfirmationModalVisible"
    :route-id="selectedRouteId"
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

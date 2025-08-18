<script setup lang="ts">
import { ref } from 'vue';
import {
  AddRouteModal,
  RemoveConfirmationModal,
  RouteCard,
  useRoutes,
} from '@/modules/routes';
import { AppButton } from '@/common/components';

const {
  routes,
  editRoute,
  openRoute,
  closeRoute,
} = useRoutes();

const isAddRouteModalVisible = ref<boolean>(false);
const isRemoveConfirmationModalVisible = ref<boolean>(false);

function addRoute(): void {
  isAddRouteModalVisible.value = true;
}

function removeRoute(): void {
  isRemoveConfirmationModalVisible.value = true;
}
</script>

<template>
  <div class="routes-list-page">
    <AppButton
      size="l"
      rounded
      theme="yellow"
      @click="addRoute"
    >
      <span class="icon icon-plus" />Создать маршрут
    </AppButton>
    <RouteCard
      v-for="item in routes"
      :key="item.id"
      :route="item"
      @open:route="openRoute"
      @edit:route="editRoute"
      @close:route="closeRoute"
      @remove:route="removeRoute"
    />
  </div>

  <AddRouteModal
    v-model:visible="isAddRouteModalVisible"
  />

  <RemoveConfirmationModal
    v-model:visible="isRemoveConfirmationModalVisible"
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

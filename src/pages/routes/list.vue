<script setup lang="ts">
import {
  RouteCard,
  useRoutes,
} from '@/modules/routes';
import { AppButton } from '@/common';

const {
  routes,
  openRoute,
  closeRoute,
} = useRoutes();
</script>

<template>
  <div class="routes-list-page">
    <AppButton
      size="l"
      rounded
      theme="yellow"
    >
      <span class="icon icon-plus" />Создать маршрут
    </AppButton>
    <RouteCard
      v-for="item in routes"
      :key="item.id"
      :route="item"
      @open:route="openRoute"
      @close:route="closeRoute"
    />
  </div>
</template>

<style lang="scss">
.routes-list-page {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1rem;
  width: 740px;
  margin: auto;
}
</style>

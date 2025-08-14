<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  type Route,
  RouteCard,
  useRoutes,
} from '@/modules/routes';
import { AppButton } from '@/common';
import { RouteNames } from '@/app/router/route-names';

const {
  routes,
  openRoute,
  closeRoute,
} = useRoutes();

const router = useRouter();

function openRoutePage(id: Route['id']): void {
  openRoute(id);

  router.push({
    name: RouteNames.RoutePage,
    params: {
      id,
    },
  });
}
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
      @open:route="openRoutePage"
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

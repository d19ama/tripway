<script setup lang="ts">
import {
  RouteCard,
  RoutesWrapper,
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
  <RoutesWrapper>
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
  </RoutesWrapper>
</template>

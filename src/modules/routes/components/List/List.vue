<script setup lang="ts">
import type { Route } from '../../types';
import { ListItem } from './components';

const routes = defineModel<Route[]>('routes', {
  required: false,
  default: () => [],
});
</script>

<template>
  <div class="list">
    <ListItem
      v-for="item in routes"
      :key="String(item.id)"
      :route="item"
    />
  </div>
</template>

<style lang="scss">
.list {
  padding: 0 2rem;
}
</style>

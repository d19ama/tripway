<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';
import { RouteNames } from '@/app/router/route-names';

const goTo: RouteLocationRaw = {
  name: RouteNames.Home,
};
</script>

<template>
  <RouterLink
    :to="goTo"
    class="app-logo"
  >
    TripRoute
  </RouterLink>
</template>

<style lang="scss">
.app-logo {
  color: $red;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2;
  font-family: 'Pacifico', sans-serif;
  background: linear-gradient(360deg, #da092d 33%, #{$red} 50%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
}
</style>

<script setup lang="ts">
import { onMounted } from 'vue';
import {
  Navigation,
  useRoutes,
} from '@/modules/routes';
import { AppPage } from '@/common';

const {
  getRoutes,
} = useRoutes();

onMounted(() => {
  getRoutes();
});
</script>

<template>
  <AppPage>
    <template #header>
      <Navigation />
    </template>
    <template #content>
      <RouterView />
    </template>
  </AppPage>
</template>

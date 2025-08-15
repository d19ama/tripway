<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  Actions,
  Navigation,
  useRoutes,
} from '@/modules/routes';
import { AppPage } from '@/common/components';

const {
  getRoutes,
  openRoute,
} = useRoutes();

const route = useRoute();

onMounted(() => {
  getRoutes();

  if (route.params.id) {
    openRoute(String(route.params.id));
  }
});
</script>

<template>
  <AppPage>
    <template #header>
      <Navigation />
      <Actions />
    </template>
    <template #content>
      <RouterView />
    </template>
  </AppPage>
</template>

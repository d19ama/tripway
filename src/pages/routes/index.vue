<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  Navigation,
  useRoutes,
} from '@/modules/routes';
import { AppPage } from '@/common/components';

const {
  readRoutes,
  openRoute,
} = useRoutes();

const route = useRoute();

onMounted(() => {
  readRoutes();

  if (route.params.id) {
    openRoute(String(route.params.id));
  }
});
</script>

<template>
  <AppPage>
    <template #header>
      <Navigation />
      <RouterView
        name="actions"
      />
    </template>
    <template #content>
      <RouterView />
    </template>
  </AppPage>
</template>

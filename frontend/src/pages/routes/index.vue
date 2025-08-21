<script setup lang="ts">
import { AppPage } from '@/common/components';
</script>

<template>
  <AppPage>
    <template #header>
      <RouterView
        name="actions"
      />
    </template>
    <template #content>
      <RouterView />
    </template>
  </AppPage>
</template>

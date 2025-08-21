<script setup lang="ts">
import {
  provide,
  ref,
} from 'vue';
import { AppSpinnerOverlay } from '@/common/components';
import { PAGE_LOADING_INDICATOR_INJECTION_KEY } from '@/common/composables';

const loading = ref<boolean>(false);

provide(PAGE_LOADING_INDICATOR_INJECTION_KEY, loading);
</script>

<template>
  <section class="app-content">
    <RouterView />

    <AppSpinnerOverlay
      v-if="loading"
      size="l"
    />
  </section>
</template>

<style lang="scss">
.app-content {
  flex: 1 0 auto;
  overflow: hidden;
  padding: 6rem 0 8rem;
  position: relative;
}
</style>

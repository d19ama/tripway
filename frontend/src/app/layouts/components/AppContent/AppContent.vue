<script setup lang="ts">
import { AppSpinnerOverlay } from '@/common/components';
import { usePageLoadingIndicator } from '@/common/composables';

const {
  loading,
} = usePageLoadingIndicator();
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

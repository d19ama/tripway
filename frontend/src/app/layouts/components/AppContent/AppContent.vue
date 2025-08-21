<script setup lang="ts">
import {
  provide,
  ref,
} from 'vue';
import { AppSpinnerOverlay } from '@/common/components';
import { PAGE_LOADING_INDICATOR_INJECTION_KEY } from '@/common/composables';

const loading = ref<boolean>(true);

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
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-size: cover;
    background-position: center;
    background-image: url('@/app/assets/images/bg.jpg');
    filter: blur(5px);
    transform-origin: center;
    transform: scale(1.1);
  }
}
</style>

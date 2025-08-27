<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import type { HTMLElementClass } from '@/common/types';

const route = useRoute();

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-container--background-image': route.meta.backgroundImage !== undefined && route.meta.backgroundImage,
  };
});
</script>

<template>
  <div
    class="app-container"
    :class="elementClass"
  >
    <Component
      :is="route.meta.layout"
    />
  </div>
</template>

<style lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;

  &--background-image {

    &:before {
      content: '';
      display: block;
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      background-size: cover;
      background-position: center;
      background-image: url('@/app/assets/images/bg.jpg');
      background-attachment: fixed;
      filter: blur(4px);
    }
  }
}
</style>

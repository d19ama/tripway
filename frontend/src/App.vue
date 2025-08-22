<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="app-container">
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
</style>

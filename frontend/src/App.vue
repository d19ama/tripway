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
}
</style>

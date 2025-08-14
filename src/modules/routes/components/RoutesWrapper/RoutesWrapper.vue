<script setup lang="ts">
import type { VNode } from 'vue';

interface Slots {
  default?: () => VNode[];
}

defineSlots<Slots>();
</script>

<template>
  <div class="routes-wrapper">
    <slot />
  </div>
</template>

<style lang="scss">
.routes-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0 2rem;
  width: 800px;
  margin: auto;
}
</style>

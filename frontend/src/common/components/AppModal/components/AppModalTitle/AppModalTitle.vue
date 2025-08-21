<script setup lang="ts">
import type { AppModalTitleSlots } from './types';

defineSlots<AppModalTitleSlots>();
</script>

<template>
  <h3
    role="heading"
    class="app-modal-title"
  >
    <slot />
  </h3>
</template>

<style lang="scss">
.app-modal-title {
  font-size: 2rem;
  line-height: 1.25;
  color: var(--color-gray-dark);
  user-select: none;
}
</style>

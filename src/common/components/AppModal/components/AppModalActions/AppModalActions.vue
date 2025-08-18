<script setup lang="ts">
import type {
  AppModalActionsProps,
  AppModalActionsSlots,
} from './types';

withDefaults(defineProps<AppModalActionsProps>(), {
  layout: 'row',
});

defineSlots<AppModalActionsSlots>();
</script>

<template>
  <div
    class="app-modal-actions"
    :style="{
      flexDirection: layout,
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.app-modal-actions {
  display: flex;
  gap: 2rem;
}
</style>

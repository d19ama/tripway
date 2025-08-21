<script setup lang="ts">
import type {
  AppTransitionProps,
  AppTransitionSlots,
} from './types';

const props = withDefaults(defineProps<AppTransitionProps>(), {
  name: 'fade',
});

defineSlots<AppTransitionSlots>();
</script>

<template>
  <Transition :name="props.name">
    <slot />
  </Transition>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

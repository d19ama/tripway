<script lang="ts" setup>
import { computed } from 'vue';
import { AppTransition } from '../';
import type { HTMLElementClass } from '../../types';

interface Props {
  overlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  overlay: false,
});

const active = defineModel<boolean>('active', {
  required: false,
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-spinner--overlay': props.overlay,
  };
});
</script>

<template>
  <AppTransition>
    <div
      v-if="active"
      class="app-spinner"
      :class="elementClass"
    >
      <div class="app-spinner__inner" />
    </div>
  </AppTransition>
</template>

<style lang="scss">
.app-spinner {
  $minWidth: 6rem;
  $minHeight: 6rem;

  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: center;
  width: auto;
  height: auto;
  min-width: $minWidth;
  min-height: $minHeight;
  position: relative;
  z-index: 999;

  &__inner {
    width: $minWidth;
    height: $minHeight;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('./assets/app-spinner.svg');
  }

  &--overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(var(--color-white), .7);
    user-select: none;
  }
}
</style>

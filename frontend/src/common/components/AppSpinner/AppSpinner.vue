<script lang="ts" setup>
import { computed } from 'vue';
import { AppTransition } from '../';
import type { HTMLElementClass } from '../../types';
import type { AppSpinnerProps } from './types';

const props = withDefaults(defineProps<AppSpinnerProps>(), {
  overlay: false,
  autoWidth: false,
});

const active = defineModel<boolean>('active', {
  required: false,
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-spinner--overlay': props.overlay,
    'app-spinner--auto-width': props.autoWidth,
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
      <div class="app-spinner__inner">
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.75s"
              values="0 12 12;360 12 12"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
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
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &--overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(var(--color-white), .7);
    user-select: none;
  }

  &--auto-width {
    width: auto;
    height: auto;
    min-width: auto;
    min-height: auto;
  }
}
</style>

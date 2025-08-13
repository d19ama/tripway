<script lang="ts" setup>
import { computed } from 'vue';
import { AppNoData } from '../AppNoData';
import type {
  AppKeyIndicatorProps,
  AppKeyIndicatorSlots,
} from './types';

const props = defineProps<AppKeyIndicatorProps>();

const slots = defineSlots<AppKeyIndicatorSlots>();

const hasName = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasValue = computed<boolean>(() => {
  return !!slots.value! || props.value;
});
</script>

<template>
  <div class="app-key-indicator">
    <AppNoData>
      <span
        v-if="hasName"
        class="app-key-indicator__name"
      >
        <slot
          name="label"
          :label="props.label"
        >
          {{ props.label }}
        </slot>
      </span>
      <span
        v-if="hasValue"
        class="app-key-indicator__value"
      >
        <slot
          name="value"
          :value="props.value"
        >
          {{ value }}
        </slot>
      </span>
    </AppNoData>
  </div>
</template>

<style lang="scss">
.app-key-indicator {
  padding: 1.5rem;
  background-color: var(--color-secondary-2);

  &__name {
    display: block;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-secondary);
  }

  &__value {
    display: block;
    margin-top: 1.25rem;
    font-size: .875rem;
    color: rgba(var(--color-secondary), .8);
  }
}
</style>

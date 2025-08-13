<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  Tippy,
  type TippyComponent,
} from 'vue-tippy';
import type {
  AppTooltipActions,
  AppTooltipProps,
  AppTooltipSlots,
} from './types';

import 'tippy.js/dist/tippy.css';

const props = withDefaults(defineProps<AppTooltipProps>(), {
  title: '',
  visible: true,
  placement: 'top',
});

defineSlots<AppTooltipSlots>();

const OFFSET: [number, number] = [
  0,
  8,
];

const instance = ref<TippyComponent>();

const actions = computed<AppTooltipActions>(() => ({
  close: instance.value?.hide,
}));

const trigger = computed<TippyComponent['trigger']>(() => {
  return props.visible
    ? 'mouseenter focus'
    : 'manual';
});
</script>

<template>
  <Tippy
    ref="instance"
    class="app-tooltip"
    content-class="app-tooltip__content"
    :placement="props.placement"
    :offset="OFFSET"
    :trigger="trigger"
    :append-to-body="true"
    interactive
  >
    <template #default>
      <slot name="activator">
        <div
          class="app-tooltip__info icon icon-info"
        />
      </slot>
    </template>

    <template #content>
      <div
        v-if="!!$slots.default"
        class="app-tooltip__content"
      >
        <slot
          name="default"
          :close="actions.close"
        />
      </div>
    </template>
  </Tippy>
</template>

<style lang="scss">
.app-tooltip {
  display: inline-flex;
  width: fit-content;
  height: fit-content;
  vertical-align: bottom;

  &__tooltip {
    max-width: 320px;
    background: var(--color-white);
    color: var(--color-secondary);
    padding: 8px 12px;
    overflow: hidden;
    overflow-wrap: break-word;
  }

  &__info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    overflow: hidden;
    color: var(--color-primary);
    font-weight: 700;
    font-size: 1rem;
    border: none;
    cursor: default;
  }

  &__content {
    text-align: left;
    font-size: .875rem;
    font-weight: 400;

    ul {
      list-style-type: disc;
      padding-inline-start: 22px;
    }
  }
}

:global(.tippy-box) {
  $arrow-height: 4px;

  border-radius: 0;

  :global(.tippy-content) {
    padding: 0;
  }

  &:global([data-placement^='top']) > :global(.tippy-arrow::before) {
    border-top-color: var(--color-dark-gray);
    bottom: -$arrow-height;
  }

  &:global([data-placement^='bottom']) > :global(.tippy-arrow::before) {
    border-bottom-color: var(--color-dark-gray);
    top: -$arrow-height;
  }

  &:global([data-placement^='left']) > :global(.tippy-arrow::before) {
    border-left-color: var(--color-dark-gray);
    right: -$arrow-height;
  }

  &:global([data-placement^='right']) > :global(.tippy-arrow::before) {
    border-right-color: var(--color-dark-gray);
    left: -$arrow-height;
  }
}
</style>

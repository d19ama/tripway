<script lang="ts" setup>
import {
  provide,
  ref,
} from 'vue';
import type { AppAccordionItemType } from './components';
import { APP_ACCORDION_STATE } from './injectionKeys';
import type { AppAccordionSlots } from './types';

defineSlots<AppAccordionSlots>();

const state = ref<AppAccordionItemType[]>([]);

provide(APP_ACCORDION_STATE, state);
</script>

<template>
  <div class="app-accordion">
    <slot />
  </div>
</template>

<style lang="scss">
.app-accordion {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
}
</style>

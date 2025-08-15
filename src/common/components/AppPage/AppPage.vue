<script setup lang="ts">
import { computed } from 'vue';
import type {
  AppPageProps,
  AppPageSlots,
} from './type';
import {
  AppNoData,
  AppTitle,
} from '@/common/components';

const props = defineProps<AppPageProps>();

const slots = defineSlots<AppPageSlots>();

const hasHeader = computed<boolean>(() => {
  return !!slots.header! || props.title;
});
</script>

<template>
  <section class="app-page">
    <AppNoData>
      <div
        v-if="hasHeader"
        class="app-page__header"
      >
        <slot name="header">
          <AppTitle
            tag="h1"
            comment
            :text="props.title"
          />
        </slot>
      </div>
      <div
        v-if="$slots.content"
        class="app-page__content"
      >
        <slot name="content" />
      </div>
      <div
        v-if="$slots.footer"
        class="app-page__footer"
      >
        <slot name="footer" />
      </div>
    </AppNoData>
  </section>
</template>

<style lang="scss">
.app-page {
  display: flex;
  flex-flow: column nowrap;
  gap: 2rem;

  &__content {
    padding: 0 2rem;
  }
}
</style>

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
import type { HTMLElementClass } from '@/common/types';

const props = withDefaults(defineProps<AppPageProps>(), {
  fullWidth: false,
});

const slots = defineSlots<AppPageSlots>();

const hasHeader = computed<boolean>(() => {
  return !!slots.header! || props.title;
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-page--full-width': props.fullWidth,
  };
});
</script>

<template>
  <section
    class="app-page"
    :class="elementClass"
  >
    <AppNoData>
      <div
        v-if="hasHeader"
        class="app-page__header"
      >
        <slot name="header">
          <AppTitle
            tag="h2"
            comment
            bordered
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
  width: 44rem;
  margin: auto;
  padding: 1rem 2rem;

  &__header {
    margin-bottom: 1rem;
  }

  &__content {
    margin-top: 1rem;
  }

  &--full-width {
    width: 100%;
  }
}
</style>

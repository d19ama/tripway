<script setup lang="ts">
import { computed } from 'vue';
import { AppTitle } from '@d19ama/common';
import { AppNoData } from '../AppNoData';
import type {
  AppContentBlockProps,
  AppContentBlockSlots,
} from './types';

const props = defineProps<AppContentBlockProps>();

const slots = defineSlots<AppContentBlockSlots>();

const hasImage = computed<boolean>(() => {
  return !!slots.image! || props.image;
});

const hasInfo = computed<boolean>(() => {
  return (!!slots.title! || props.title) || (!!slots.description! || props.description);
});
</script>

<template>
  <div class="app-content-block">
    <AppNoData>
      <div
        v-if="hasImage"
        class="app-content-block__image-wrapper"
      >
        <slot
          name="image"
          :image="props.image"
        >
          <img
            :src="props.image"
            :alt="props.title"
            class="app-content-block__image"
          >
        </slot>
      </div>
      <div
        v-if="hasInfo"
        class="app-content-block__info"
      >
        <slot
          name="title"
          :title="props.title"
        >
          <AppTitle
            tag="h3"
            :text="props.title"
          />
        </slot>
        <slot
          name="description"
          :description="props.description"
        >
          <p>{{ props.description }}</p>
        </slot>
      </div>
    </AppNoData>
  </div>
</template>

<style lang="scss">
.app-content-block {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0 1rem;
  padding: 1rem;
  @include box-shadow-main;

  &__image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    min-height: 10rem;
    flex-shrink: 0;
    border: 1px solid var(--color-gray-middle);
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
  }

  &__info {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem 0;
    width: 60%;
  }
}
</style>

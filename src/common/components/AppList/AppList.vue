<script lang="ts" setup>
import { AppListItem } from './components';
import type {
  AppListProps,
  AppListSlots,
} from './types';

const props = withDefaults(defineProps<AppListProps>(), {
  tag: 'ul',
  items: () => [],
  noMarkers: false,
});

defineSlots<AppListSlots>();
</script>

<template>
  <Component
    :is="tag"
    class="list"
  >
    <AppListItem
      v-for="item in items"
      :key="item.id"
      :tag="props.tag"
      :no-markers="props.noMarkers"
    >
      <slot
        :name="`list-item-${String(item.id)}`"
        :data="item"
      >
        {{ item.label }}
      </slot>
    </AppListItem>
  </Component>
</template>

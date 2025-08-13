<script setup lang="ts" generic="T extends object">
import {
  type StyleValue,
  computed,
} from 'vue';
import type {
  AppTableHeader,
  AppTableProps,
  AppTableSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';

const props = withDefaults(defineProps<AppTableProps<T>>(), {
  rows: () => [],
  headers: () => [],
  hideHeader: false,
});

defineSlots<AppTableSlots<T>>();

const elementClass = computed<HTMLElementClass>(() => {
  return {};
});

function cellWidth(cell: AppTableHeader<T>): StyleValue {
  return cell.width
    ? {
        width: `${cell.width}`,
      }
    : {};
}
</script>

<template>
  <div
    class="app-table"
    :class="elementClass"
  >
    <table class="app-table__content">
      <thead
        v-if="!props.hideHeader"
        class="app-table__thead"
      >
        <tr class="app-table__tr">
          <th
            v-for="cell in props.headers"
            :key="cell.id"
            :style="cellWidth(cell)"
            class="app-table__th"
          >
            <slot
              :name="`th-${String(cell.name)}`"
              :data="cell"
            >
              {{ cell.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody class="app-table__tbody">
        <tr
          v-for="row in props.rows"
          :key="row.id"
          class="app-table__tr"
        >
          <td
            v-for="cell in props.headers"
            :key="cell.id"
            class="app-table__td"
            :style="cellWidth(cell)"
          >
            <slot
              :name="`td-${String(cell.name)}`"
              :data="row.data"
            >
              {{ row.data[cell.name] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.app-table {
  $parent: &;

  border: 1px solid var(--color-secondary);

  &__content {
    width: 100%;
    border-collapse: collapse;
  }

  &__thead {
    border-bottom: 1px solid var(--color-secondary);
  }

  &__th,
  &__td {
    padding: .5rem;
  }

  &__th {
    text-align: left;
  }

  &__td {
    vertical-align: top;
  }
}
</style>

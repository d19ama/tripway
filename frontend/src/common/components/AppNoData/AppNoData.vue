<script setup lang="ts">
import type { AppNoDataSlots } from './types';

defineSlots<AppNoDataSlots>();
</script>

<template>
  <slot v-if="$slots.default" />
  <template v-else>
    <span class="text-highlighter">No data!</span>
  </template>
</template>

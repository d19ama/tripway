<script setup lang="ts">
import { computed } from 'vue';
import sanitizeHtml from 'sanitize-html';
import type { AppSanitizeHtmlProps } from './types';

const props = withDefaults(defineProps<AppSanitizeHtmlProps>(), {
  allowedTags: () => [
    'p',
    'b',
    'ul',
    'ol',
    'li',
    'br',
    'div',
    'span',
  ],
});

const computedContent = computed<string>(() => {
  return sanitizeHtml(props.content, {
    allowedTags: props.allowedTags as string[],
  });
});
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-html="computedContent" />
  <!-- eslint-enable -->
</template>

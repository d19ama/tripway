<script lang="ts" setup>
import { AppButton } from '@d19ama/common';
import type {
  AppLangSelectorProps,
  AppLangSelectorVariants,
} from './types';

const props = withDefaults(defineProps<AppLangSelectorProps>(), {
  storageKey: 'TRIPWAY_',
});

const lang = defineModel<AppLangSelectorVariants>('lang', {
  required: true,
  default: 'en',
});

function change(): void {
  const value: AppLangSelectorVariants = lang.value === 'ru'
    ? 'en'
    : 'ru';

  lang.value = value;
  localStorage.setItem(props.storageKey, value);
}
</script>

<template>
  <AppButton
    rounded
    auto-width
    @click="change"
  >
    <template #prepend>
      <div class="icon icon-earth" />
    </template>
    {{ lang.toUpperCase() }}
  </AppButton>
</template>

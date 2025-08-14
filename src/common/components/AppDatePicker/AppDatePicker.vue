<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type {
  AppDatePickerModel,
  AppDatePickerProps,
} from './types';

const props = withDefaults(defineProps<AppDatePickerProps>(), {
  range: false,
  placeholder: '',
  autoApply: true,
  disabled: false,
  yearPicker: false,
  monthPicker: false,
  modelType: 'format',
  format: 'yyyy.MM.dd',
});

const date = defineModel<AppDatePickerModel>('date', {
  required: false,
});
</script>

<template>
  <VueDatePicker
    v-model="date"
    :range="props.range"
    :format="props.format"
    :auto-apply="props.autoApply"
    :model-type="props.modelType"
    :year-picker="props.yearPicker"
    :placeholder="props.placeholder"
    :month-picker="props.monthPicker"
  />
</template>

<style lang="scss">
.dp__theme_light {
  --dp-background-color: var(--color-white);
  --dp-text-color: rgba(var(--color-gray-dark), .5);
  --dp-border-color: var(--color-gray-dark);
  --dp-menu-border-color: var(--color-gray-dark);
  --dp-border-color-hover: var(--color-gray-dark);
  --dp-border-color-focus: var(--color-gray-dark);
  --dp-icon-color: var(--color-gray-dark);

  --dp-border-radius: 0;
  --dp-font-size: .875rem;
  --dp-preview-font-size: .875rem;
  --dp-time-font-size: .875rem;
  --dp-input-padding: 1rem;

  ::placeholder {
    color: rgba(var(--color-gray-lite), .75);
  }
}
</style>

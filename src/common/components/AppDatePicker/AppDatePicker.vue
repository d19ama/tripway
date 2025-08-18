<script setup lang="ts">
import { computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import type {
  AppDatePickerModel,
  AppDatePickerProps,
  AppDatePickerSlots,
} from './types';
import '@vuepic/vue-datepicker/dist/main.css';

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

const slots = defineSlots<AppDatePickerSlots>();

const date = defineModel<AppDatePickerModel>('date', {
  required: false,
});

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && !date.value;
});
</script>

<template>
  <div class="app-date-picker">
    <div
      v-if="hasLabel"
      class="app-date-picker__label"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
      <span
        v-if="props.required"
        class="app-date-picker__label-asterisk"
      >*</span>
    </div>
    <div class="app-date-picker__wrapper">
      <VueDatePicker
        v-model="date"
        :range="props.range"
        :format="props.format"
        :auto-apply="props.autoApply"
        :model-type="props.modelType"
        :year-picker="props.yearPicker"
        :month-picker="props.monthPicker"
      />
      <span
        v-if="isPlaceholderVisible"
        class="app-date-picker__placeholder"
      >
        {{ props.placeholder }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
$padding: 1rem;

.app-date-picker {
  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  gap: .5rem;
  position: relative;

  &__wrapper {
    width: 100%;
    padding: $padding 0;
    position: relative;
    border-radius: .5rem;
    background-color: var(--color-gray-lite);
  }

  &__label {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: .125rem;
    width: 100%;
    font-size: .875rem;
    color: var(--color-gray-dark);
    user-select: none;
  }

  &__label-asterisk {
    color: var(--color-red);
  }

  &__placeholder {
    display: block;
    max-width: 100%;
    opacity: .5;
    overflow: hidden;
    padding: $padding $padding $padding 2.5rem;
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    color: var(--color-gray-dark);
    text-overflow: ellipsis;
    pointer-events: none;
  }
}

.dp__theme_light {
  --dp-background-color: var(--color-gray-lite);
  --dp-text-color: var(--color-gray-dark);
  --dp-border-color: none;
  --dp-menu-border-color: none;
  --dp-border-color-hover: none;
  --dp-border-color-focus: none;
  --dp-icon-color: var(--color-gray-dark);

  --dp-border-radius: 0;
  --dp-font-size: .875rem;
  --dp-preview-font-size: .875rem;
  --dp-time-font-size: .875rem;
  --dp-input-padding: $padding;
  --dp-input-icon-padding: 2.5rem;

  ::placeholder {
    color: rgba(var(--color-gray-lite), .75);
  }

  .dp__input_icons {
    padding: 0 $padding;
  }
}
</style>

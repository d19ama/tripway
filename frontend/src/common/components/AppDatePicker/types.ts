import type { VueDatePickerProps } from '@vuepic/vue-datepicker';
import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

export type AppDatePickerModel = Date | number | string | string[];

export interface AppDatePickerProps {
  range?: VueDatePickerProps['range'];
  format?: VueDatePickerProps['format'];
  required?: VueDatePickerProps['required'];
  disabled?: VueDatePickerProps['disabled'];
  autoApply?: VueDatePickerProps['autoApply'];
  modelType?: VueDatePickerProps['modelType'];
  yearPicker?: VueDatePickerProps['yearPicker'];
  monthPicker?: VueDatePickerProps['yearPicker'];
  placeholder?: VueDatePickerProps['placeholder'];

  hint?: string;
  label?: string;
  errorText?: string;
  validation?: BaseValidation;
}

export interface AppDatePickerSlots {
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
}

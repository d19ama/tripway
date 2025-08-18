import type { VueDatePickerProps } from '@vuepic/vue-datepicker';
import type { VNode } from 'vue';

export type AppDatePickerModel = Date | number | string | string[];

export interface AppDatePickerProps {
  label?: string;
  range?: VueDatePickerProps['range'];
  format?: VueDatePickerProps['format'];
  required?: VueDatePickerProps['required'];
  disabled?: VueDatePickerProps['disabled'];
  autoApply?: VueDatePickerProps['autoApply'];
  modelType?: VueDatePickerProps['modelType'];
  yearPicker?: VueDatePickerProps['yearPicker'];
  monthPicker?: VueDatePickerProps['yearPicker'];
  placeholder?: VueDatePickerProps['placeholder'];
}

export interface AppDatePickerSlots {
  label?: () => VNode[];
}

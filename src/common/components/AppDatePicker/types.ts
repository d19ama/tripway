import type { VueDatePickerProps } from '@vuepic/vue-datepicker';

export type AppDatePickerModel = Date | number | string | string[];

export interface AppDatePickerProps {
  range?: VueDatePickerProps['range'];
  format?: VueDatePickerProps['format'];
  disabled?: VueDatePickerProps['disabled'];
  autoApply?: VueDatePickerProps['autoApply'];
  modelType?: VueDatePickerProps['modelType'];
  yearPicker?: VueDatePickerProps['yearPicker'];
  monthPicker?: VueDatePickerProps['yearPicker'];
  placeholder?: VueDatePickerProps['placeholder'];
}

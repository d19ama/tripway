import type { VNode } from 'vue';

export interface AppKeyIndicatorProps {
  label?: string;
  value?: string;
}

export interface AppKeyIndicatorSlots {
  label?: (scope: {
    label: AppKeyIndicatorProps['label'];
  }) => VNode[];
  value?: (scope: {
    value: AppKeyIndicatorProps['value'];
  }) => VNode[];
}

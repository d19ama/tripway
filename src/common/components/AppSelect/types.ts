import type { VNode } from 'vue';

export interface AppSelectProps {
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
  options?: AppSelectOption[];
}

export interface AppSelectOption {
  id: string;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface AppSelectSlots {
  [key: `checkbox-${AppSelectOption['id']}`]: (scope: {
    text: string;
  }) => VNode[];
}

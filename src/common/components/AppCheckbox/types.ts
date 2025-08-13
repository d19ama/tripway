import type { VNode } from 'vue';

export interface AppCheckboxProps {
  name?: string;
  text?: string;
  disabled?: boolean;
}

export interface AppCheckboxSlots {
  default?: () => VNode[];
}

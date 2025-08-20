import type { VNode } from 'vue';

export interface AppRadioProps {
  disabled?: boolean;
  required?: boolean;
  options?: AppRadioOption[];
}

export interface AppRadioEmits {
  input: [value: string];
  change: [value: string];
}

export interface AppRadioOption {
  id: string;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface AppRadioSlots {
  [key: `radio-${AppRadioOption['id']}`]: (scope: {
    text: AppRadioOption['text'];
  }) => VNode[];
}

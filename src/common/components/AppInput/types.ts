import type { VNode } from 'vue';

export interface AppInputProps {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
  theme?: 'text' | 'search';
  position?: 'left' | 'center' | 'right';
  type?: 'text' | 'tel' | 'email' | 'password';
}

export interface AppInputEmits {
  input: [value: string];
  change: [value: string];
}

export interface AppInputSlots {
  label?: () => VNode[];
  error?: () => VNode[];
}

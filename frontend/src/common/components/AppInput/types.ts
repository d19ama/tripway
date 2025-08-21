import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

export interface AppInputProps {
  label?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: string;
  errorText?: string;
  placeholder?: string;
  theme?: 'text' | 'search';
  position?: 'left' | 'center' | 'right';
  type?: 'text' | 'tel' | 'email' | 'password';
  validation?: BaseValidation;
}

export interface AppInputEmits {
  input: [value: string];
  change: [value: string];
  focus: [];
  blur: [];
}

export interface AppInputSlots {
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
}

import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

export interface AppTextareaProps {
  label?: string;
  hint?: string;
  resize?: boolean;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
  validation?: BaseValidation;
}

export interface AppTextareaEmits {
  blur: [];
  focus: [];
  input: [value: string];
  change: [value: string];
}

export interface AppTextareaSlots {
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
}

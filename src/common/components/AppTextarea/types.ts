import type { VNode } from 'vue';

export interface AppTextareaProps {
  resize?: boolean;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
}

export interface AppTextareaEmits {
  input: [value: string];
  change: [value: string];
}

export interface AppTextareaSlots {
  error?: () => VNode[];
}

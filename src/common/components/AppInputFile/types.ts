import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

export type AppInputFileType = 'base64' | 'file';

export type AppInputFileAcceptType = 'image' | 'json';

export interface AppInputFileProps {
  label?: string;
  hint?: string;
  required?: boolean;
  multiple?: boolean;
  errorText?: string;
  acceptSize?: number;
  buttonText?: string;
  placeholder?: string;
  type?: AppInputFileType;
  validation?: BaseValidation;
  acceptType?: AppInputFileAcceptType;
}

export interface AppInputFileEmits {
  'update:file': [value: File];
  'update:base64': [value: string];
}

export interface AppInputFileSlots {
  file?: (scope: {
    file?: File;
  }) => VNode[];
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
  button?: () => VNode[];
}

import type { VNode } from 'vue';

export type AppInputFileType = 'base64' | 'file';

export type AppInputFileAcceptType = 'image' | 'json';

export interface AppInputFileProps {
  multiple?: boolean;
  acceptSize?: number;
  buttonText?: string;
  description?: string;
  type?: AppInputFileType;
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
  error?: (scope: {
    error: string;
  }) => VNode[];
}

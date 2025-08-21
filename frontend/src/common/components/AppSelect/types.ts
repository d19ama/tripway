import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

export interface AppSelectProps {
  hint?: string;
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
  options?: AppSelectOption[];
  validation?: BaseValidation;
}

export interface AppSelectOption<ID extends string | number | symbol = string> {
  id: ID;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface AppSelectSlots {
  [key: `checkbox-${AppSelectOption['id']}`]: (scope: {
    text: string;
  }) => VNode[];
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
}

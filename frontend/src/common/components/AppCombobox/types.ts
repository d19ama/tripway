import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

export interface AppComboboxProps {
  name?: string;
  hint?: string;
  label?: string;
  loading?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  maxLength?: string;
  placeholder?: string;
  searchError?: boolean;
  validation?: BaseValidation;
}

export interface AppComboboxOption<ID extends string | number | symbol = string> {
  id: ID;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface AppComboboxSlots {
  [key: `checkbox-${AppComboboxOption['id']}`]: (scope: {
    text: string;
  }) => VNode[];
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
}

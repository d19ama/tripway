import type { VNode } from 'vue';
import type { BaseValidation } from '@vuelidate/core';
import type {
  FactoryConstructorOpts,
  FactoryInstanceOpts,
  FactoryStaticOpts,
  MaskedPatternOptions,
} from 'imask';

type FactoryStaticOptionsWithoutLazy =
  | Exclude<FactoryStaticOpts, 'MaskedPatternOptions'>
  | Omit<Extract<FactoryStaticOpts, MaskedPatternOptions>, 'lazy' | 'eager'>;

export type AppInputMaskParams =
  | FactoryConstructorOpts
  | FactoryInstanceOpts
  | FactoryStaticOptionsWithoutLazy;

export interface AppInputMaskValues {
  typedValue: string;
  maskedValue: string;
  unmaskedValue: string;
}

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
  type?: 'text' | 'number' | 'tel' | 'email' | 'password';

  // validation
  validation?: BaseValidation;

  // mask
  mask?: AppInputMaskParams;
  maskVisibility?: 'always' | 'onFocus';
}

export interface AppInputEmits {
  input: [value: string | number];
  change: [value: string | number];
  focus: [];
  blur: [];
}

export interface AppInputSlots {
  hint?: () => VNode[];
  label?: () => VNode[];
  error?: () => VNode[];
}

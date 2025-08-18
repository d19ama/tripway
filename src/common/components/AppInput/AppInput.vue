<script lang="ts" setup>
import {
  computed,
  ref,
} from 'vue';
import type {
  AppInputEmits,
  AppInputProps,
  AppInputSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';

const props = withDefaults(defineProps<AppInputProps>(), {
  type: 'text',
  theme: 'text',
  errorText: '',
  disabled: false,
  required: false,
  placeholder: '',
  position: 'left',
});

const emit = defineEmits<AppInputEmits>();

const slots = defineSlots<AppInputSlots>();

const value = defineModel<string>('value', {
  required: false,
  default: '',
});

const error = ref<boolean>(false);
const focus = ref<boolean>(false);

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const maxLength = computed<string>(() => {
  return props.type === 'tel'
    ? '17'
    : '255';
});

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && !focus.value
    && !value.value;
});

const isErrorVisible = computed<boolean>(() => {
  return props.required
    && error.value;
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-input--error': error.value,
    'app-input--disabled': props.disabled,
  };
});

function onChange(): void {
  validate(value.value);
  emit('change', value.value);
}

function onInput(): void {
  validate(value.value);
  emit('input', value.value);
}

function onFocus(): void {
  focus.value = true;
}

function onBlur(): void {
  focus.value = false;
}

function checkEmail(value: string): void {
  if (!validateEmail(value)) {
    error.value = true;
  }
}

function checkTel(value: string): void {
  if (value.length < 17) {
    error.value = true;
  }
}

function validateEmail(email: string): boolean {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
}

function validate(value: string): void {
  if (props.required && !value) {
    error.value = true;
  } else {
    error.value = false;

    if (props.type === 'email') {
      checkEmail(value);
    } else if (props.type === 'tel') {
      checkTel(value);
    }
  }
}
</script>

<template>
  <div
    class="app-input"
    :class="elementClass"
  >
    <div
      v-if="hasLabel"
      class="app-input__label"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
      <span
        v-if="props.required"
        class="app-input__label-asterisk"
      >*</span>
    </div>
    <div class="app-input__wrapper">
      <input
        v-model="value"
        :type="props.type"
        autocomplete="off"
        :maxlength="maxLength"
        class="app-input__input"
        :disabled="props.disabled"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @change="onChange"
        @keyup.enter="onChange"
      >
      <span
        v-if="isPlaceholderVisible"
        class="app-input__placeholder"
      >
        {{ props.placeholder }}
      </span>
      <span
        v-if="isErrorVisible"
        class="app-input__error"
      >
        <slot name="error">
          {{ props.errorText }}
        </slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
$padding: 1rem;

.app-input {
  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  gap: .5rem;
  position: relative;

  &__wrapper {
    width: 100%;
    padding: $padding;
    position: relative;
    border-radius: .5rem;
    background-color: var(--color-gray-lite);
  }

  &__label {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: .125rem;
    width: 100%;
    font-size: .875rem;
    color: var(--color-gray-dark);
    user-select: none;
  }

  &__label-asterisk {
    color: var(--color-red);
  }

  &__input {
    width: 100%;
    border: none;
    padding: 0;
    background-color: transparent;

    &:hover,
    &:focus {
      outline: 0 none;
    }

    &:invalid {
      box-shadow: none;
    }

    &::-ms-clear {
      display: none;
    }
  }

  &__input,
  &__placeholder {
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    color: var(--color-gray-dark);
  }

  &__placeholder {
    display: block;
    max-width: 100%;
    opacity: .5;
    overflow: hidden;
    padding: $padding;
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  &__error {
    color: var(--color-red);
    font-size: .75rem;
    font-weight: 400;
    line-height: 1.4;
  }

  &--disabled {
    opacity: .1;
    pointer-events: none;
  }

  &--error {
    border-color: var(--color-red);
  }
}
</style>

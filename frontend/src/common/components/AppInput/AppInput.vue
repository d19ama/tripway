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
  hint: '',
  label: '',
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

const [
  value,
  modifiers,
] = defineModel<string>('value', {
  required: false,
  default: '',
  set(value) {
    if (modifiers.trim) {
      return value.trim();
    }

    return value;
  },
});

const error = ref<boolean>(false);
const focus = ref<boolean>(false);

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasHint = computed<boolean>(() => {
  return !!slots.hint! || props.hint;
});

const errorMessage = computed<string | undefined>(() => {
  if (props.errorText) {
    return props.errorText;
  }

  if (props.validation) {
    return props.validation.$errors.map(({
      $message,
    }) => $message.toString()).at(0);
  }

  return undefined;
});

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && !focus.value
    && !value.value;
});

const isErrorVisible = computed<boolean>(() => {
  return props.required
    && error.value
    && !!errorMessage.value;
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-input--disabled': props.disabled,
  };
});

function onChange(): void {
  emit('change', value.value);
}

function onInput(): void {
  emit('input', value.value);
}

function onFocus(): void {
  focus.value = true;
  emit('focus');
}

function onBlur(): void {
  validate();
  focus.value = false;
  emit('blur');
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
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
        autocomplete="off"
        class="app-input__input"
        :type="props.type"
        :disabled="props.disabled"
        :maxlength="props.maxLength"
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
    </div>
    <span
      v-if="isErrorVisible"
      class="app-input__error"
    >
      <slot name="error">
        {{ errorMessage }}
      </slot>
    </span>
    <span
      v-if="hasHint && !isErrorVisible"
      class="app-input__hint"
    >
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </span>
  </div>
</template>

<style lang="scss">
.app-input {
  $parent: &;
  $padding: 1rem;

  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  gap: .25rem;
  position: relative;

  &__wrapper {
    width: 100%;
    position: relative;
    border-radius: .5rem;
    background-color: var(--color-gray-lite);
  }

  &__label,
  &__error,
  &__hint {
    font-size: .75rem;
    font-weight: 400;
    line-height: 1.4;
  }

  &__label {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: .125rem;
    width: 100%;
    color: var(--color-gray-dark);
    user-select: none;
  }

  &__label-asterisk {
    color: var(--color-red);
  }

  &__input {
    width: 100%;
    border: none;
    padding: $padding;
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

  &__hint {
    opacity: .5;
    color: var(--color-gray-dark);
  }

  &__error {
    color: var(--color-red);
  }

  &--disabled {
    opacity: .1;
    pointer-events: none;
  }
}
</style>

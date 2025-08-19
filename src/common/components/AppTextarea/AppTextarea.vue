<script lang="ts" setup>
import {
  computed,
  ref,
} from 'vue';
import type {
  AppTextareaEmits,
  AppTextareaProps,
  AppTextareaSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';

const props = withDefaults(defineProps<AppTextareaProps>(), {
  hint: '',
  label: '',
  resize: false,
  required: false,
  disabled: false,
  errorText: '',
  placeholder: '',
});

const emit = defineEmits<AppTextareaEmits>();

const slots = defineSlots<AppTextareaSlots>();

const value = defineModel<string>('value', {
  required: true,
});

const error = ref<boolean>(false);
const focus = ref<boolean>(false);

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasHint = computed<boolean>(() => {
  return !!slots.hint! || props.hint;
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-textarea--resizable': props.resize,
    'app-textarea--disabled': props.disabled,
  };
});

const counter = computed<number>(() => {
  return value.value.length;
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

const isErrorVisible = computed<boolean>(() => {
  return props.required
    && error.value
    && !!errorMessage.value;
});

function onInput(): void {
  emit('input', value.value);
}

function onChange(): void {
  emit('change', value.value);
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
    class="app-textarea"
    :class="elementClass"
  >
    <div
      v-if="hasLabel"
      class="app-textarea__label"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
      <span
        v-if="props.required"
        class="app-textarea__label-asterisk"
      >*</span>
    </div>
    <span class="app-textarea__wrapper">
      <textarea
        v-model="value"
        cols="30"
        rows="10"
        maxLength="999"
        class="app-textarea__textarea"
        :disabled="props.disabled"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @change="onChange"
      />
      <span
        v-show="props.placeholder && !focus && !value"
        class="app-textarea__placeholder"
      >
        {{ props.placeholder }}
      </span>
    </span>
    <span
      v-show="isErrorVisible"
      class="app-textarea__error"
    >
      <slot name="error">
        {{ errorMessage }}
      </slot>
    </span>
    <span
      v-if="counter > 0"
      class="app-textarea__counter"
    >{{ counter }}</span>
    <span
      v-if="hasHint && !isErrorVisible"
      class="app-textarea__hint"
    >
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </span>
  </div>
</template>

<style lang="scss">
.app-textarea {
  $parent: &;

  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  gap: .25rem;
  position: relative;

  &__wrapper {
    width: 100%;
    height: 8rem;
    position: relative;
    padding: 1rem 1.5rem 1rem 1rem;
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

  &__textarea {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    resize: none;
    background-color: transparent;

    &:focus,
    &:hover {
      outline: 0 none;
    }
  }

  &__textarea,
  &__placeholder {
    font-weight: 400;
    line-height: 1.4;
    font-size: .875rem;
    color: rgba(var(--color-gray-lite), .5);
  }

  &__placeholder {
    display: block;
    max-width: 100%;
    opacity: .5;
    overflow: hidden;
    padding: 1rem;
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

  &__counter {
    width: 1rem;
    font-size: 0.5rem;
    position: absolute;
    right: 4px;
    bottom: 6px;
    text-align: center;
  }

  &--resizable {

    #{$parent}__textarea {
      resize: both;
    }
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }
}
</style>

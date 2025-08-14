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
  resize: false,
  required: false,
  disabled: false,
  errorText: 'Error!',
  placeholder: 'Placeholder',
});

const emit = defineEmits<AppTextareaEmits>();

defineSlots<AppTextareaSlots>();

const value = defineModel<string>('value', {
  required: true,
});

const error = ref<boolean>(false);
const focus = ref<boolean>(false);

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-textarea--error': error.value,
    'app-textarea--resizable': props.resize,
    'app-textarea--disabled': props.disabled,
  };
});

const counter = computed<number>(() => {
  return value.value.length;
});

function onInput(): void {
  error.value = validate();
  emit('input', value.value);
}

function onChange(): void {
  error.value = validate();
  emit('change', value.value);
}

function validate(): boolean {
  return props.required && !value.value;
}
</script>

<template>
  <label
    class="app-textarea"
    :class="elementClass"
  >
    <textarea
      v-model="value"
      cols="30"
      rows="10"
      maxLength="999"
      class="app-textarea__textarea"
      :disabled="props.disabled"
      @blur="focus = false"
      @focus="focus = true"
      @input="onInput"
      @change="onChange"
    />
    <span
      v-show="props.placeholder && !focus && !value"
      class="app-textarea__placeholder"
    >
      {{ props.placeholder }}
    </span>
    <span
      v-show="props.required && error"
      class="app-textarea__error"
    >
      <slot name="error">
        {{ props.errorText }}
      </slot>
    </span>
    <span
      v-if="counter > 0"
      class="app-textarea__counter"
    >{{ counter }}</span>
  </label>
</template>

<style lang="scss">
.app-textarea {
  $parent: &;

  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  height: 8rem;
  padding: 1rem 1.5rem 1rem 1rem;
  position: relative;
  border-radius: 0;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-dark);

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
    overflow: hidden;
    padding: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  &__error {
    padding: .2rem 0 0;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    color: var(--color-red);
    font-size: .65rem;
  }

  &__counter {
    width: 1rem;
    font-size: 0.5rem;
    position: absolute;
    right: 3px;
    bottom: 3px;
    text-align: center;
  }

  &--resizable {

    #{$parent}__textarea {
      resize: both;
    }
  }

  &--error {
    box-shadow: inset 0 0 0 1px var(--color-red);
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }
}
</style>

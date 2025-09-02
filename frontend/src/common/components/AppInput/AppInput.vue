<script lang="ts" setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import iMask, {
  type FactoryOpts,
  type InputMask,
} from 'imask';
import type {
  AppInputEmits,
  AppInputMaskValues,
  AppInputProps,
  AppInputSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';
import { componentName } from '@/common/helpers';

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
  maskVisibility: 'always',
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

// Значение без маски
const unmasked = defineModel<string>('unmasked', {
  required: false,
  default: '',
});

// значение по типу
const typed = defineModel<string>('typed', {
  required: false,
  default: '',
});

const error = ref<boolean>(false);
const focus = ref<boolean>(false);

const inputRef = ref<HTMLInputElement | null>(null);
const maskRef = ref<InputMask<FactoryOpts> | undefined>(undefined);

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

const maskParams = computed<FactoryOpts | undefined>(() => {
  if (props.mask) {
    return {
      ...props.mask,
      lazy: props.maskVisibility === 'onFocus',
      eager: props.maskVisibility === 'onFocus',
    };
  }

  return undefined;
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

function initMask(): void {
  if (!maskParams.value) {
    return;
  }

  const mask: InputMask<FactoryOpts> = iMask(inputRef.value as HTMLInputElement, maskParams.value)
    .on('accept', onMaskAccept);

  maskRef.value = mask;

  if (typed.value) {
    mask.typedValue = typed.value;
  }

  if (unmasked.value) {
    mask.unmaskedValue = unmasked.value;
  }

  onMaskAccept();
}

function updateMask(): void {
  if (!maskParams.value) {
    return;
  }

  maskRef.value?.updateOptions(maskParams.value);
}

function destroyMask(): void {
  maskRef.value?.destroy();
}

function getValues(): AppInputMaskValues {
  const typedValue = maskRef.value!.typedValue;
  const unmaskedValue = maskRef.value!.unmaskedValue;
  const maskedValue = maskRef.value!.value;

  return {
    typedValue,
    unmaskedValue,
    maskedValue,
  };
}

function onMaskAccept(): void {
  const {
    typedValue,
    maskedValue,
    unmaskedValue,
  }: AppInputMaskValues = getValues();

  value.value = maskedValue;
  typed.value = typedValue;
  unmasked.value = unmaskedValue;
}

onMounted(initMask);
onUnmounted(destroyMask);

watch(unmasked, (value) => {
  if (maskRef.value) {
    maskRef.value.unmaskedValue = value || '';
  }
});

watch(
  maskParams,
  (params) => {
    if (params) {
      if (!maskRef.value) {
        initMask();
      } else {
        updateMask();
      }
    } else {
      destroyMask();
    }
  },
  {
    deep: true,
  },
);
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
        ref="inputRef"
        v-model="value"
        :name="componentName('app-input')"
        autocomplete="off"
        class="app-input__input"
        :type="props.type"
        :disabled="props.disabled"
        :maxlength="props.maxLength"
        :placeholder="props.placeholder"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @change="onChange"
        @keyup.enter="onChange"
      >
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

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }

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

    &::placeholder {
      opacity: .5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &__input {
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    color: var(--color-gray-dark);
  }

  &__hint {
    opacity: .5;
    color: var(--color-gray-dark);
  }

  &__error {
    color: var(--color-red);
  }
}
</style>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';
import type {
  AppSelectOption,
  AppSelectProps,
  AppSelectSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';

const props = withDefaults(defineProps<AppSelectProps>(), {
  hint: '',
  label: '',
  errorText: '',
  placeholder: '',
  multiple: false,
  disabled: false,
  required: false,
  options: () => [],
});

const slots = defineSlots<AppSelectSlots>();

const selected = defineModel<string>('selected', {
  required: false,
  default: '',
});

const error = ref<boolean>(false);
const opened = ref<boolean>(false);
const selectRef = ref<HTMLElement | null>(null);
const localOptions = ref<AppSelectOption[]>(props.options);

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasHint = computed<boolean>(() => {
  return !!slots.hint! || props.hint;
});

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && !selected.value;
});

const selectClass = computed<HTMLElementClass>(() => {
  return {
    'app-select--opened': opened.value,
    'app-select--disabled': props.disabled,
  };
});

const dropdownClass = computed<HTMLElementClass>(() => {
  return {
    'app-select__dropdown--opened': opened.value,
  };
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

onMounted(() => {
  document.addEventListener('click', hideDropdown);
});

function hideDropdown(event: MouseEvent): void {
  if (!selectRef.value) {
    return;
  }

  const select = selectRef.value as HTMLElement;
  const isOutside: boolean = select !== event.target && !select.contains(event.target as Node);

  if (isOutside) {
    opened.value = false;
  }
}

function changeSelected(option: AppSelectOption): void {
  localOptions.value = localOptions.value.map((item) => {
    return {
      ...item,
      selected: item.id === option.id,
    };
  });
  selected.value = option.text;
  opened.value = false;
}

function toggleDropdown(): void {
  opened.value = !opened.value;
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
}

function optionClass(item: AppSelectOption): HTMLElementClass {
  return {
    'app-select__option--selected': item.selected,
    'app-select__option--disabled': item.disabled,
  };
}

watch(props.options, (value) => {
  localOptions.value = value;
});

watch(opened, (value) => {
  if (!value) {
    validate();
  }
});
</script>

<template>
  <div
    ref="selectRef"
    class="app-select"
    :class="selectClass"
  >
    <div
      v-if="hasLabel"
      class="app-select__label"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
      <span
        v-if="props.required"
        class="app-select__label-asterisk"
      >*</span>
    </div>
    <div
      class="app-select__container"
      @click.self="toggleDropdown"
    >
      <span
        v-if="isPlaceholderVisible"
        class="app-select__placeholder"
      >
        {{ props.placeholder }}
      </span>
      <span
        v-if="selected.length"
        class="app-select__selected"
      >
        {{ selected }}
      </span>
      <span class="app-select__arrow" />
    </div>
    <div
      class="app-select__dropdown"
      :class="dropdownClass"
    >
      <ul class="app-select__options">
        <li
          v-for="item in localOptions"
          :key="item.id"
          class="app-select__option"
          :class="optionClass(item)"
          @click="changeSelected(item)"
        >
          <slot
            :name="`checkbox-${String(item.id)}`"
            :text="item.text"
          >
            {{ item.text }}
          </slot>
        </li>
      </ul>
    </div>
    <span
      v-if="isErrorVisible"
      class="app-select__error"
    >
      <slot name="error">
        {{ errorMessage }}
      </slot>
    </span>
    <span
      v-if="hasHint && !isErrorVisible"
      class="app-select__hint"
    >
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </span>
  </div>
</template>

<style lang="scss">
.app-select {
  $padding: 1rem;
  $parent: &;

  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: .5rem;
  width: 100%;
  position: relative;
  user-select: none;

  &--opened {

    #{$parent}__arrow {
      transform: rotate(180deg);
    }
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }

  &__container {
    width: 100%;
    overflow: hidden;
    padding: 1rem 2rem 1rem 1rem;
    position: relative;
    border-radius: .5rem;
    background-color: var(--color-gray-lite);
    cursor: pointer;
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

  &__selected,
  &__placeholder {
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    color: var(--color-gray-dark);
  }

  &__selected {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  &__placeholder {
    display: block;
    opacity: .5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  &__clear {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 42px;
    z-index: 2;
    border-radius: 50%;
    background-color: var(--color-white);
    box-shadow: inset 0 0 0 1px var(--color-gray-dark);
    transform: translateY(-50%);
    transition: background-color var(--transition), box-shadow var(--transition);

    &:before,
    &:after {
      content: '';
      display: block;
      width: .75rem;
      height: .125rem;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--color-gray-dark);
      margin: auto;
      transition: background-color var(--transition);
      z-index: 1;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }

    &:hover {
      background-color: var(--color-gray-lite);
      box-shadow: none;

      &:before,
      &:after {
        background-color: var(--color-red-dark);
      }
    }
  }

  &__arrow {
    display: block;
    width: 0;
    height: 0;
    margin: auto;
    position: absolute;
    top: 0;
    right: .75rem;
    bottom: 0;
    z-index: 2;
    border: 4px solid transparent;
    border-top: 8px solid var(--color-gray-dark);
    border-bottom: 0;
    pointer-events: none;
  }

  &__dropdown {
    display: none;
    width: calc(100% + 2px);
    overflow: auto;
    position: absolute;
    top: calc(100% + .5rem);
    left: -1px;
    z-index: 10;
    border-radius: .5rem;
    background-color: var(--color-gray-lite);
    transition: opacity var(--transition);

    &--opened {
      display: block;
    }
  }

  &__options {
    margin: 0;
  }

  &__option {
    padding: 1rem;
    font-weight: 400;
    line-height: 1.4;
    font-size: .875rem;
    color: var(--color-gray-dark);
    transition: background-color var(--transition);
    cursor: pointer;

    &:hover {
      background-color: var(--color-gray-middle);
    }

    &--selected {
      position: relative;

      &::before {
        content: '\ea10';
        position: absolute;
        top: 50%;
        right: .5rem;
        transform: translateY(-50%);
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-red);
        font-family: 'icon-font', sans-serif;
      }
    }

    &--disabled {
      opacity: .5;
      pointer-events: none;
    }
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

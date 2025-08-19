<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';
import type {
  AppComboboxOption,
  AppComboboxProps,
  AppComboboxSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';
import { AppSpinner } from '@/common/components';

const props = withDefaults(defineProps<AppComboboxProps>(), {
  hint: '',
  label: '',
  errorText: '',
  loading: false,
  placeholder: '',
  multiple: false,
  disabled: false,
  required: false,
});

const slots = defineSlots<AppComboboxSlots>();

const selected = defineModel<string>('selected', {
  required: false,
  default: '',
});

const options = defineModel<AppComboboxOption[]>('options', {
  required: false,
  default: () => [],
});

const search = ref<string>('');
const focus = ref<boolean>(false);
const error = ref<boolean>(false);
const opened = ref<boolean>(false);
const selectRef = ref<HTMLElement | null>(null);

const localOptions = computed<AppComboboxOption[]>({
  get() {
    return options.value.filter((item) => {
      return item.text.toLowerCase().includes(search.value.toLowerCase());
    });
  },
  set(value) {
    options.value = value;
  },
});

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasHint = computed<boolean>(() => {
  return !!slots.hint! || props.hint;
});

const isDropdownVisible = computed<boolean>(() => {
  return focus.value
    && search.value.length > 1;
});

const isPlaceholderVisible = computed<boolean>(() => {
  return props.placeholder.length > 0
    && (!search.value && !selected.value);
});

const selectClass = computed<HTMLElementClass>(() => {
  return {
    'app-combobox--opened': opened.value,
    'app-combobox--disabled': props.disabled,
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

const hasOptions = computed<boolean>(() => {
  return !props.loading && localOptions.value.length > 0;
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
    focus.value = false;
  }
}

function changeSelected(option: AppComboboxOption): void {
  localOptions.value = localOptions.value.map((item) => {
    return {
      ...item,
      selected: item.id === option.id,
    };
  });
  selected.value = option.text;
  search.value = option.text;
  opened.value = false;
  focus.value = false;
}

function onFocus(): void {
  focus.value = true;
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
}

function optionClass(item: AppComboboxOption): HTMLElementClass {
  return {
    'app-combobox__option--selected': item.selected,
    'app-combobox__option--disabled': item.disabled,
  };
}

watch(options, (value) => {
  localOptions.value = value;
});

watch(focus, (value) => {
  if (!value) {
    validate();
  }
});
</script>

<template>
  <div
    ref="selectRef"
    class="app-combobox"
    :class="selectClass"
    @click="onFocus"
  >
    <div
      v-if="hasLabel"
      class="app-combobox__label"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
      <span
        v-if="props.required"
        class="app-combobox__label-asterisk"
      >*</span>
    </div>
    <div class="app-combobox__container">
      <span
        v-if="isPlaceholderVisible"
        class="app-combobox__placeholder"
      >
        {{ props.placeholder }}
      </span>
      <input
        v-model="search"
        autocomplete="off"
        class="app-combobox__input"
        type="text"
        :disabled="props.disabled"
        :maxlength="props.maxLength"
      >
      <span class="app-combobox__arrow" />
    </div>
    <div
      v-if="isDropdownVisible"
      class="app-combobox__dropdown"
    >
      <ul
        v-if="hasOptions"
        class="app-combobox__options"
      >
        <li
          v-for="item in localOptions"
          :key="item.id"
          class="app-combobox__option"
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
      <AppSpinner
        v-else-if="props.loading"
        :active="props.loading"
        class="app-combobox__loading"
        auto-width
      />
      <div
        v-else
        class="app-combobox__empty"
      >
        Не удалось загрузить данные.<br>Проверьте подключение к интернету и попробуйте еще раз.
      </div>
    </div>
    <span
      v-if="isErrorVisible"
      class="app-combobox__error"
    >
      <slot name="error">
        {{ errorMessage }}
      </slot>
    </span>
    <span
      v-if="hasHint && !isErrorVisible"
      class="app-combobox__hint"
    >
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </span>
  </div>
</template>

<style lang="scss">
.app-combobox {
  $padding: 1rem;
  $parent: &;

  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: .25rem;
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

  &__input,
  &__placeholder {
    padding: 1rem 2.5rem 1rem 1rem;
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    color: var(--color-gray-dark);
  }

  &__input {
    width: 100%;
    border: none;
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

  &__placeholder {
    display: block;
    opacity: .5;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
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
    border: 8px solid transparent;
    border-top: 10px solid var(--color-gray-dark);
    border-bottom: 0;
    cursor: pointer;
  }

  &__dropdown {
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

  &__option,
  &__empty {
    padding: 1rem;
    font-weight: 400;
    line-height: 1.4;
    font-size: .875rem;
    color: var(--color-gray-dark);
  }

  &__option {
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

  &__empty {
    opacity: .5;
  }

  &__loading {
    width: 2rem;
    height: 2rem;
    margin: 1rem auto;
    color: var(--color-blue-dark);
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

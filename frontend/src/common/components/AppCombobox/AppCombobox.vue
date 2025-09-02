<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type {
  AppComboboxEmits,
  AppComboboxOption,
  AppComboboxProps,
  AppComboboxSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';
import { AppSpinner } from '@/common/components';
import {
  DEFAULT_DELAY,
  DEFAULT_SEARCH_LENGTH,
} from '@/common/constants';
import { componentName } from '@/common/helpers';

const props = withDefaults(defineProps<AppComboboxProps>(), {
  hint: '',
  label: '',
  errorText: '',
  loading: false,
  placeholder: '',
  multiple: false,
  disabled: false,
  required: false,
  searchError: false,
});

const emit = defineEmits<AppComboboxEmits>();

const slots = defineSlots<AppComboboxSlots>();

const value = defineModel<string>('value', {
  required: false,
  default: '',
});

const options = defineModel<AppComboboxOption[]>('options', {
  required: false,
  default: () => [],
});

const search = defineModel<string>('search', {
  required: false,
  default: '',
});

const error = ref<boolean>(false);
const opened = ref<boolean>(false);
const focused = ref<boolean>(false);
const localSearch = ref<string>('');
const rootRef = useTemplateRef<HTMLElement>('rootRef');

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasHint = computed<boolean>(() => {
  return !!slots.hint! || props.hint;
});

const isDropdownVisible = computed<boolean>(() => {
  return opened.value
    && search.value.length > DEFAULT_SEARCH_LENGTH;
});

const selectClass = computed<HTMLElementClass>(() => {
  return {
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
  return !props.loading && options.value.length > 0;
});

const updateSearch = useDebounceFn((value) => {
  search.value = value;
}, DEFAULT_DELAY);

function hideDropdown(event: MouseEvent): void {
  if (!rootRef.value) {
    return;
  }

  const isOutside: boolean = rootRef.value !== event.target
    && !rootRef.value.contains(event.target as Node);

  if (isOutside) {
    opened.value = false;
  }
}

function changeSelected(option: AppComboboxOption): void {
  options.value = options.value.map((item) => {
    return {
      ...item,
      selected: item.id === option.id,
    };
  });

  opened.value = false;
  value.value = option.text;
  localSearch.value = option.text;
}

function onFocus(): void {
  focused.value = true;
  emit('focus');
}

function onBlur(): void {
  focused.value = false;
  emit('blur');
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

onMounted(() => {
  document.addEventListener('click', hideDropdown);
});

watch(localSearch, (value) => {
  const searchable = value.length > DEFAULT_SEARCH_LENGTH;

  opened.value = searchable;

  if (searchable) {
    updateSearch(value);
  }
});

watch(focused, (value) => {
  if (!value) {
    validate();
  }
});
</script>

<template>
  <div
    ref="rootRef"
    class="app-combobox"
    :class="selectClass"
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
      <input
        v-model="localSearch"
        :name="componentName('app-combobox')"
        :maxlength="props.maxLength"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        autocomplete="off"
        class="app-combobox__input"
        type="text"
        @focus="onFocus"
        @blur="onBlur"
      >
      <div
        v-if="isDropdownVisible"
        class="app-combobox__dropdown"
      >
        <ul
          v-if="hasOptions"
          class="app-combobox__options"
        >
          <li
            v-for="item in options"
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
          v-else-if="props.searchError"
          class="app-combobox__empty"
        >
          Не удалось загрузить данные.<br>Проверьте подключение к интернету и попробуйте еще раз.
        </div>
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
      v-else-if="hasHint"
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

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }

  &__container {
    width: 100%;
    height: 3.5rem;
    padding: 1rem;
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
    line-height: 1.5;
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
    font-weight: 400;
    line-height: 1.5rem;
    font-size: .875rem;
    color: var(--color-gray-dark);
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

    &::placeholder {
      opacity: .5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
    width: 100%;
    overflow: auto;
    position: absolute;
    top: calc(100% + .25rem);
    left: 0;
    z-index: 10;
    border-radius: .5rem;
    border: 1px solid transparent;
    background-color: var(--color-gray-lite);
    transition: opacity var(--transition);
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
    display: flex;
    align-self: center;
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

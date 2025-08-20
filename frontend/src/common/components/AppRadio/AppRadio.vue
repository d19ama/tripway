<script lang="ts" setup>
import { ref } from 'vue';
import type {
  AppRadioEmits,
  AppRadioOption,
  AppRadioProps,
  AppRadioSlots,
} from './types';

const props = withDefaults(defineProps<AppRadioProps>(), {
  required: false,
  disabled: false,
  options: () => [],
});

const emit = defineEmits<AppRadioEmits>();

defineSlots<AppRadioSlots>();

const value = defineModel<string>('value', {
  required: true,
});

const error = ref<boolean>(false);

function uniqueName(item: AppRadioOption): string {
  return `${item.text}-${item.id}`;
}

function onChange(): void {
  validate();
  emit('input', value.value);
}

function onInput(): void {
  validate();
  emit('input', value.value);
}

function validate(): void {
  error.value = props.required && !value.value;
}
</script>

<template>
  <div
    class="app-radio"
    :class="{
      'app-radio--disabled': props.disabled,
    }"
  >
    <div
      v-for="item in props.options"
      :key="item.id"
      class="app-radio__option"
      :class="{
        'app-radio--disabled': item.disabled,
      }"
    >
      <input
        :id="uniqueName(item)"
        v-model="value"
        type="radio"
        :value="item.id"
        class="app-radio__input"
        :checked="item.selected"
        :disabled="item.disabled"
        @input="onInput"
        @change="onChange"
      >
      <label
        class="app-radio__label"
        :for="uniqueName(item)"
      >
        <span
          class="app-radio__text"
        >
          <slot
            :name="`radio-${String(item.id)}`"
            :text="item.text"
          >
            {{ item.text }}
          </slot>
        </span>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
.app-radio {
  $parent: &;

  &__option {
    position: relative;
    user-select: none;

    &+& {
      margin-top: .5rem;
    }
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__text {
    font-weight: 400;
    color: var(--color-black);
    font-size: .875rem;
    line-height: 1.5rem;
  }

  &__label {
    display: flex;
    height: 1.5rem;
    font-size: 1rem;
    padding-left: 39px;
    position: relative;
    color: var(--color-black);
    line-height: 1.5rem;
    transition: color var(--transition);
    cursor: pointer;

    &:before {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 100%;
      border: 1px solid var(--color-gray-dark);
      background-color: var(--color-white);
      transition: border-color var(--transition), background-color var(--transition), opacity var(--transition);
    }

    &:hover {

      &::before {
        border-color: var(--color-red);
      }
    }

    &:active {

      &:before {
        background-color: var(--color-red);
      }
    }
  }

  &__input:checked + #{$parent}__label {

    &::before {
      border-color: var(--color-red);
      background-color: var(--color-red);
      box-shadow: inset 0 0 0 4px var(--color-white);
    }
  }

  &__error {
    color: var(--color-red);
    font-size: 1rem;
    line-height: 1.4;
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }
}
</style>

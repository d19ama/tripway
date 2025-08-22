<script lang="ts" setup>
import { computed } from 'vue';
import type {
  AppCheckboxProps,
  AppCheckboxSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';
import { componentName } from '@/common/helpers';

const props = withDefaults(defineProps<AppCheckboxProps>(), {
  name: () => componentName('app-checkbox'),
  disabled: false,
});

defineSlots<AppCheckboxSlots>();

const checked = defineModel<boolean>('checked', {
  required: true,
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-checkbox--checked': checked.value,
    'app-checkbox--disabled': props.disabled,
  };
});
</script>

<template>
  <label
    :for="props.name"
    class="app-checkbox"
    :class="elementClass"
  >
    <input
      :id="props.name"
      v-model="checked"
      :name="props.name"
      type="checkbox"
      :disabled="props.disabled"
      class="app-checkbox__input"
    >
    <span class="app-checkbox__box icon icon-checkmark" />
    <span class="app-checkbox__text">
      <slot>
        {{ props.text }}
      </slot>
    </span>
  </label>
</template>

<style lang="scss">
.app-checkbox {
  $parent: &;

  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  gap: .5rem;
  width: 100%;
  user-select: none;
  cursor: pointer;

  &:hover {

    #{$parent}__box {
      background-color: var(--color-gray-middle);
    }
  }

  &__input {
    display: none;
  }

  &__box,
  &__text {
    font-size: .875rem;
    font-weight: 400;
    color: var(--color-black);
    line-height: 1.5rem;
  }

  &__box {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    border-radius: .5rem;
    color: transparent;
    background-color: var(--color-gray-lite);
    transition: background-color var(--transition);
  }

  &--checked {

    #{$parent}__box {
      color: var(--color-gray-dark);
    }
  }

  &--disabled {
    opacity: .4;
    pointer-events: none;
  }
}
</style>

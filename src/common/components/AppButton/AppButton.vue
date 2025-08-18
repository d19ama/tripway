<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type {
  AppButtonEmits,
  AppButtonProps,
  AppButtonSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';

const props = withDefaults(defineProps<AppButtonProps>(), {
  test: '',
  size: 'm',
  theme: 'red',
  tag: 'button',
  to: undefined,
  type: 'button',
  rounded: false,
  disabled: false,
  download: false,
  autoWidth: false,
  downloadName: 'file',
});

const emit = defineEmits<AppButtonEmits>();

defineSlots<AppButtonSlots>();

const router = useRouter();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-button--size-${props.size}`,
    `app-button--theme-${props.theme}`,
    {
      'app-button--rounded': props.rounded,
      'app-button--disabled': props.disabled,
      'app-button--auto-width': props.autoWidth,
    },
  ];
});

const hrefValue = computed<string | undefined>(() => {
  return props.tag === 'a'
    ? props.href
    : undefined;
});

const targetValue = computed<string | undefined>(() => {
  return (props.tag === 'a' && props.blank)
    ? '_blank'
    : undefined;
});

const downloadValue = computed<string | undefined>(() => {
  return (props.tag === 'a' && props.download)
    ? props.downloadName
    : undefined;
});

function onClick(event: Event): void {
  if (props.tag === 'button') {
    event.preventDefault();
  }

  if (props.to) {
    router.push({
      name: props.to,
    });

    return;
  }

  emit('click', event);
}
</script>

<template>
  <Component
    :is="props.tag"
    class="app-button"
    :href="hrefValue"
    :type="props.type"
    :class="elementClass"
    :target="targetValue"
    :download="downloadValue"
    :disabled="props.disabled"
    @click="onClick"
  >
    <span v-if="!!$slots.prepend">
      <slot name="prepend" />
    </span>
    <slot>
      {{ props.text }}
    </slot>
    <span v-if="!!$slots.append">
      <slot name="append" />
    </span>
  </Component>
</template>

<style lang="scss">
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0 6px;
  text-align: center;
  text-decoration: none;
  border: 0;
  outline: 0;
  background-color: transparent;
  transition: background-color var(--transition), color var(--transition);
  user-select: none;
  cursor: pointer;

  &--disabled {
    opacity: .7;
    pointer-events: none;
  }

  &--rounded {
    border-radius: .5rem;
  }

  &--auto-width {
    width: auto;
  }

  &--size-s {
    padding: .25rem .5rem;
    font-size: .75rem;
    font-weight: 500;
    line-height: 1.5;
  }

  &--size-m {
    padding: .5rem 1rem;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.5;
  }

  &--size-l {
    padding: .75rem 1.5rem;
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1.5;
  }

  // Themes
  &--theme-red {
    color: var(--color-white);
    background-color: var(--color-red-dark);

    &:hover {
      background-color: var(--color-red);
    }
  }

  &--theme-yellow {
    color: var(--color-white);
    background-color: var(--color-yellow-dark);

    &:hover {
      background-color: var(--color-yellow);
    }
  }

  &--theme-green {
    color: var(--color-white);
    background-color: var(--color-green-dark);

    &:hover {
      background-color: var(--color-green);
    }
  }

  &--theme-blue-dark {
    color: var(--color-white);
    background-color: var(--color-blue-dark);

    &:hover {
      background-color: var(--color-blue-middle);
    }
  }

  &--theme-border-blue {
    color: var(--color-blue-dark);
    border: 2px solid var(--color-blue-dark);

    &:hover {
      color: var(--color-blue-middle);
      border-color: var(--color-blue-middle);
    }
  }

  &--theme-border-red {
    color: var(--color-red-dark);
    border: 2px solid var(--color-red-dark);

    &:hover {
      color: var(--color-red);
      border-color: var(--color-red);
    }
  }

  &--theme-border-yellow {
    color: var(--color-yellow-dark);
    border: 2px solid var(--color-yellow-dark);

    &:hover {
      color: var(--color-yellow);
      border-color: var(--color-yellow);
    }
  }

  &--theme-border-green {
    color: var(--color-green-dark);
    border: 2px solid var(--color-green-dark);

    &:hover {
      color: var(--color-green);
      border-color: var(--color-green);
    }
  }

  &--theme-icon-red {
    color: var(--color-white);
    background-color: var(--color-red);

    &:hover {
      color: rgba($white, .5);
    }
  }

  &--theme-transparent {
    color: var(--color-black);
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>

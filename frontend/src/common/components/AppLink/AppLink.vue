<script lang="ts" setup>
import { computed } from 'vue';
import type {
  AppLinkEmits,
  AppLinkProps,
  AppLinkSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';

const props = withDefaults(defineProps<AppLinkProps>(), {
  url: '#',
  text: '',
  hover: 'red',
  prevent: false,
  underline: true,
  target: '_blank',
  theme: 'primary',
});

const emit = defineEmits<AppLinkEmits>();

defineSlots<AppLinkSlots>();

const elementClass = computed<HTMLElementClass>(() => {
  return [
    `app-link--${props.theme}`,
    `app-link--hover-${props.hover}`,
    {
      'app-link--underline': props.underline,
    },
  ];
});

function onClick(event: Event): void {
  if (props.prevent) {
    event.preventDefault();
  }

  emit('click', event);
}
</script>

<template>
  <a
    :href="props.url"
    class="app-link"
    :class="elementClass"
    :target="props.target"
    @click="onClick"
  >
    <slot>
      {{ props.text }}
    </slot>
  </a>
</template>

<style lang="scss">
.app-link {
  color: var(--color-black);
  transition: color var(--transition);

  &:visited,
  &:focus,
  &:active {
    outline: 0 none;
  }

  &--hover-red {

    &:hover {
      color: var(--color-red);
    }
  }

  &--underline {
    text-decoration: underline;
  }

  &--primary {
    color: var(--color-red);
  }

  &--secondary {
    color: var(--color-gray-middle);
  }
}
</style>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { useModalStore } from './composables';
import type {
  AppModalProps,
  AppModalSlots,
} from './types';
import type { HTMLElementClass } from '@/common/types';
import { AppButton } from '@/common/components';
import { useComponentId } from '@/common/composables';

const props = withDefaults(defineProps<AppModalProps>(), {
  size: 's',
  title: '',
  rounded: true,
  appendTo: 'body',
});

defineSlots<AppModalSlots>();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const {
  escape,
} = useMagicKeys();

const {
  add,
  remove,
  active,
} = useModalStore();

const titleId = useComponentId('modal-title');

const id = ref<symbol>(Symbol('PaModal'));

const isActive = computed<boolean>(() => {
  return active.value !== undefined && active.value.id === id.value;
});

const modalClass = computed<HTMLElementClass>(() => {
  return [
    `app-modal--${props.size}`,
  ];
});

const containerClass = computed<HTMLElementClass>(() => {
  return [
    {
      'app-modal__container--full-page': props.size === 'full-page',
      'app-modal__container--rounded': props.rounded,
    },
  ];
});

function close(): void {
  visible.value = false;
}

watch(
  visible,
  (value) => {
    if (value) {
      add({
        id: id.value,
      });
    } else {
      remove({
        id: id.value,
      });
    }
  },
  {
    immediate: true,
  },
);

watch(() => escape?.value, () => {
  close();
});

watch(
  active,
  (value) => {
    document.body.style.overflow = value !== undefined
      ? 'hidden'
      : '';
  },
  {
    immediate: true,
  },
);
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <Teleport
    v-if="isActive"
    :to="props.appendTo"
  >
    <div
      v-if="visible && props.size !== 'full-page'"
      class="app-modal__overlay"
      @click="close"
    />
    <div
      v-if="visible"
      class="app-modal"
      :class="modalClass"
      role="dialog"
      :aria-labelledby="props.title ?? titleId"
      aria-modal="true"
      v-bind="$attrs"
    >
      <div
        class="app-modal__container"
        :class="containerClass"
        data-testid="dialog-container"
      >
        <AppButton
          class="app-modal__button-close"
          data-testid="dialog-close-btn"
          text="Закрыть"
          rounded
          auto-width
          @click="close"
        />

        <div
          v-if="props.title || $slots.header"
          class="app-modal__header app-modal__shrink"
        >
          <slot name="header">
            {{ title }}
          </slot>
        </div>

        <div
          v-if="$slots.default"
          class="app-modal__body"
        >
          <slot />
        </div>

        <div
          v-if="$slots.footer"
          class="app-modal__footer app-modal__shrink"
        >
          <slot
            name="footer"
            :close="close"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.app-modal {
  --modal-width: inherit;
  --modal-x-padding: inherit;
  --modal-height: auto;
  --modal-content-padding: 56px;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: var(--modal-x-padding);
  padding-right: var(--modal-x-padding);
  z-index: 999;
  pointer-events: none;

  &--s {
    --modal-width: 532px;
    --modal-x-padding: 20px;
  }

  &--m {
    --modal-width: 718px;
    --modal-x-padding: 20px;
  }

  &--l {
    --modal-width: 994px;
    --modal-x-padding: 20px;
  }

  &--full-width {
    --modal-width: 100%;
    --modal-x-padding: 0;
  }

  &--full-page {
    --modal-width: 100%;
    --modal-height: 100%;
    --modal-x-padding: 0;
    display: block;
  }

  &__overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: var(--color-black-50);
    backdrop-filter: blur(2px);
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: var(--modal-width);
    height: var(--modal-height);
    max-width: 100%;
    max-height: 96vh;
    padding-bottom: var(--modal-content-padding);
    padding-top: var(--modal-content-padding);
    position: relative;
    overflow: hidden;
    background-color: var(--color-white);
    pointer-events: auto;

    &--full-page {
      max-height: 100vh;
    }

    &--rounded {
      border-radius: .5rem;
    }
  }

  &__button-close {
    z-index: 1;
    position: absolute;
    right: 12px;
    top: 12px;
  }

  &__header {
    padding-bottom: 28px;
  }

  &__body {
    padding-right: var(--modal-content-padding);
    padding-left: var(--modal-content-padding);
    overflow: auto;
    flex-grow: 1;
    white-space: pre-line;
  }

  &__footer {
    margin-top: 40px;
    padding-right: var(--modal-content-padding);
    padding-left: var(--modal-content-padding);
  }

  &__shrink {
    flex-shrink: 1;
  }
}
</style>

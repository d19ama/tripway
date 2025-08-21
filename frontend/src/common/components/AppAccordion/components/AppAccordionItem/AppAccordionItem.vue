<script lang="ts" setup>
import {
  type Ref,
  inject,
  onMounted,
  ref,
} from 'vue';
import Velocity from 'velocity-animate';
import { APP_ACCORDION_STATE } from '../../injectionKeys';
import type {
  AppAccordionItemProps,
  AppAccordionItemSlots,
  AppAccordionItemType,
} from './types';
import { componentName } from '@/common/helpers/component-name';
import { DEFAULT_DURATION } from '@/common/constants';

const props = withDefaults(defineProps<AppAccordionItemProps>(), {
  header: '',
  body: '',
});

defineSlots<AppAccordionItemSlots>();

const currentState = ref<AppAccordionItemType>({
  name: componentName('app-accordion-item'),
  active: false,
});

const state = inject<Ref<AppAccordionItemType[]>>(APP_ACCORDION_STATE, ref<AppAccordionItemType[]>([]));

function toggleItem(): void {
  currentState.value.active = !currentState.value.active;
}

function animationEnter(el: Element): void {
  Velocity(
    el,
    'slideDown',
    {
      duration: DEFAULT_DURATION,
    },
  );
}

function animationLeave(el: Element): void {
  Velocity(
    el,
    'slideUp',
    {
      duration: DEFAULT_DURATION,
    },
  );
}

onMounted(() => {
  state.value.push(currentState.value);
});
</script>

<template>
  <div class="app-accordion-item">
    <div
      class="app-accordion-item__header"
      @click="toggleItem"
    >
      <span
        class="app-accordion-item__button"
        :class="{
          'app-accordion-item__button--active': currentState.active,
        }"
      >&#62;</span>
      <slot name="header">
        {{ props.header }}
      </slot>
    </div>
    <Transition
      @enter="animationEnter"
      @leave="animationLeave"
    >
      <div
        v-if="currentState.active"
        class="app-accordion-item__body"
        :class="{
          'app-accordion-item__body--active': currentState.active,
        }"
      >
        <div class="app-accordion-item__content">
          <slot name="body">
            {{ props.body }}
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.app-accordion-item {
  border-bottom: 1px solid var(--color-gray-lite);
  transition: background-color var(--transition);

  &__header {
    display: flex;
    flex-flow: row nowrap;
    gap: 0 .5rem;
    padding: 1rem 2rem 1rem 1rem;
    position: relative;
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 700;
    color: var(--color-black);
    text-decoration: none;
    transition: background-color var(--transition), color var(--transition);
    user-select: none;
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--color-black);
      background-color: var(--color-white);
    }

    &:active {
      color: var(--color-black);
      background-color: var(--color-white);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 100%;
    overflow: hidden;
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    font-size: 1rem;
    font-style: normal;
    border-radius: 50%;
    transform: rotate(90deg);
    transition: transform .3s;

    &--active {
      transform: rotate(270deg);
    }
  }

  &__body {
    padding: 1rem;
    transition: background-color var(--transition);

    &--active {
      background-color: var(--color-white);
    }
  }

  &__content {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }
}
</style>

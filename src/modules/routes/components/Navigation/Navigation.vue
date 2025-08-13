<script setup lang="ts">
import { computed } from 'vue';
import type { HTMLElementClass } from '@/common/types';
import { AppButton } from '@/common';
import type { Route } from '@/modules/routes';

interface Emits {
  'close:route': [id: Route['id']];
  'select:route': [id: Route['id']];
}

const emit = defineEmits<Emits>();

const routes = defineModel<Route[]>('routes', {
  required: false,
  default: () => [],
});

const selected = computed<Route[]>(() => {
  return routes.value.filter((item: Route) => item.opened);
});

function tabClass(selected: boolean): HTMLElementClass {
  return [
    'navigation__tab navigation__tab--route',
    {
      'navigation__tab--active': selected,
    },
  ];
}

function selectTab(id: Route['id']): void {
  emit('select:route', id);
}

function closeRoute(id: Route['id']): void {
  emit('close:route', id);
}
</script>

<template>
  <div class="navigation">
    <div class="navigation__tabs">
      <div class="navigation__tab navigation__tab--first">
        <span
          class="navigation__tab-name"
          @click="selectTab(null)"
        >Маршруты</span>
      </div>
      <div
        v-for="item in selected"
        :key="String(item.id)"
        :class="tabClass(item.selected)"
      >
        <span
          class="navigation__tab-name"
          @click="selectTab(item.id)"
        >{{ item.name }}</span>
        <div
          title="Закрыть"
          class="navigation__tab-close icon icon-cross"
          @click="closeRoute(item.id)"
        />
      </div>
    </div>
    <div class="navigation__view">
      <AppButton theme="icon-red">
        <span class="icon icon-map" />
      </AppButton>
      <AppButton theme="icon-red">
        <span class="icon icon-list" />
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.navigation {
  $parent: &;
  $height: 2.5rem;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: $height;
  background-color: $white;
  box-shadow: inset 0 1px 0 0 rgba($gray-dark, .2), 0 0 10px 0 rgba($gray-dark, .5);

  &__tabs {
    height: 100%;
  }

  &__tab {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    max-width: 12rem;
    padding: .75rem 1rem;
    position: relative;
    color: $white;
    font-size: .875rem;
    white-space: nowrap;

    &-name {
      overflow: hidden;
      position: relative;
      z-index: 1;
      text-overflow: ellipsis;
      border-bottom: 1px dotted rgba($white, .8);
      cursor: pointer;

      &:hover {
        border-bottom-color: transparent;
      }
    }

    &-close {
      position: relative;
      right: -.75rem;
      z-index: 1;
      font-size: .6rem;
      border-radius: 50%;
      color: $white;
      cursor: pointer;
      transition: opacity $transition;

      &:hover {
        opacity: .8;
      }
    }

    &--first {
      z-index: 1;
      background-color: $blue-dark;

      &:after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        box-sizing: border-box;
        margin: auto 0;
        position: absolute;
        top: 0;
        left: 100%;
        z-index: 1;
        border: 10px solid transparent;
        border-top-width: #{$height / 2};
        border-bottom-width: #{$height / 2};
        border-left-color: $blue-dark;
      }
    }

    &--route {
      padding-left: 2rem;
      background-color: $red;

      &+& {
        padding-left: 1rem;
        margin-left: 2.1rem;
      }

      &:after {
        content: '';
        display: block;
        width: calc(100% + 2rem);
        height: 100%;
        position: absolute;
        top: 0;
        left: -1rem;
        transform-origin: center;
        transform: skewX(22deg);
        background-color: $red;
        transition: background-color $transition;
      }
    }

    &--active {

      &#{$parent}__tab {

        &--route {

          &:after {
            background-color: $red-dark;
          }
        }
      }

      #{$parent}__tab {

        &-name {
          border-bottom-color: transparent;
        }
      }
    }
  }

  &__view {
    display: flex;
    height: 100%;

    &:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-top: #{$height} solid transparent;
      border-right: #{$height / 2} solid $red;
    }

    .app-button {
      width: 4rem;
      height: 100%;
    }
  }
}
</style>

<script setup lang="ts">
import {
  computed,
  watch,
} from 'vue';
import { useRouter } from 'vue-router';
import type { HTMLElementClass } from '@/common/types';
import { AppButton } from '@/common';
import {
  type Route,
  useRoutes,
} from '@/modules/routes';
import { RouteNames } from '@/app/router/route-names';

const {
  routes,
  closeRoute,
  closeAllRoutes,
} = useRoutes();

const router = useRouter();

const selected = computed<Route[]>(() => {
  return routes.value.filter((item: Route) => item.opened);
});

const isClearAllButtonVisible = computed<boolean>(() => {
  const opened: Route[] | undefined = routes.value.filter((item) => {
    return item.opened;
  });

  return opened && opened.length > 1;
});

function tabClass(selected: boolean): HTMLElementClass {
  return [
    'navigation__tab navigation__tab--route',
    {
      'navigation__tab--active': selected,
    },
  ];
}

function goToList(): void {
  router.push({
    name: RouteNames.RoutesList,
  });
}

function selectTab(id: Route['id']): void {
  router.push({
    name: RouteNames.RoutePage,
    params: {
      id,
    },
  });
}

function changeView(): void {
  console.warn('View changed!');
}

watch(
  routes,
  (value) => {
    const allClosed = value.every((item) => {
      return !item.opened;
    });

    if (allClosed) {
      goToList();
    }
  },
  {
    deep: true,
  },
);
</script>

<template>
  <div class="navigation">
    <div class="navigation__tabs">
      <div class="navigation__tab navigation__tab--first">
        <span
          class="navigation__tab-name"
          @click="goToList"
        >Маршруты</span>
      </div>
      <div
        v-for="item in selected"
        :key="String(item.id)"
        :class="tabClass(item.active)"
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
      <div
        v-if="isClearAllButtonVisible"
        class="navigation__tab navigation__tab--last"
      >
        <span
          class="navigation__tab-name"
          @click="closeAllRoutes"
        >Закрыть все</span>
      </div>
    </div>
    <div class="navigation__view">
      <AppButton
        theme="icon-red"
        @click="changeView"
      >
        <span class="icon icon-map" />
      </AppButton>
      <AppButton
        theme="icon-red"
        @click="changeView"
      >
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
    color: var(--color-white);
    font-size: .875rem;
    white-space: nowrap;

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

    &--last {
      margin-left: 1rem;
      font-size: .75rem;
      color: var(--color-black);
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

  &__tab-name {
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

  &__tab-close {
    position: relative;
    right: -.75rem;
    z-index: 1;
    font-size: .6rem;
    border-radius: 50%;
    color: var(--color-white);
    cursor: pointer;
    transition: opacity var(--transition);

    &:hover {
      opacity: .8;
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
  }
}
</style>

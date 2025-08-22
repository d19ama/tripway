<script setup lang="ts">
import { computed } from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import type { HTMLElementClass } from '@/common/types';
import { AppButton } from '@/common/components';
import {
  type RouteEntity,
  useRoutes,
} from '@/modules/routes';
import { RouteNames } from '@/app/router/route-names';
import { useNavigation } from '@/modules/navigation';

const {
  routes,
  selectedRoutes,
} = useRoutes();

const {
  closeRoute,
  closeAllRoutes,
} = useNavigation();

const route = useRoute();

const router = useRouter();

const isClearAllButtonVisible = computed<boolean>(() => {
  const opened: RouteEntity[] | undefined = routes.value.filter((item) => {
    return item.opened;
  });

  return opened && opened.length > 1;
});

function tabClass(id: RouteEntity['id']): HTMLElementClass {
  return {
    'navigation__tab--active': String(route.params.id) === id,
  };
}

function selectTab(id: RouteEntity['id']): void {
  router.push({
    name: RouteNames.RoutePage,
    params: {
      id,
    },
  });
}

function closeTab(id: RouteEntity['id']): void {
  closeRoute(id);
}

function closeAllRoutesTabs(): void {
  closeAllRoutes();
}

function changeView(): void {
  console.warn('View changed!');
}
</script>

<template>
  <div class="navigation">
    <div class="navigation__tabs">
      <RouterLink
        class="navigation__tab navigation__tab--first"
        :to="{
          name: RouteNames.RoutesList,
        }"
      >
        <span class="navigation__tab-name">
          Маршруты
        </span>
      </RouterLink>
      <div
        v-for="item in selectedRoutes"
        :key="String(item.id)"
        class="navigation__tab navigation__tab--route"
        :class="tabClass(item.id)"
      >
        <span
          class="navigation__tab-name"
          @click="selectTab(item.id)"
        >{{ item.name }}</span>
        <div
          title="Закрыть"
          class="navigation__tab-close icon icon-cross"
          @click="closeTab(item.id)"
        />
      </div>
      <div
        v-if="isClearAllButtonVisible"
        class="navigation__tab navigation__tab--last"
        @click="closeAllRoutesTabs"
      >
        <span class="navigation__tab-name">Закрыть все</span>
      </div>
    </div>
    <div class="navigation__view">
      <AppButton
        theme="blue-dark"
        size="l"
        class="navigation__button"
        @click="changeView"
      >
        <span class="icon icon-map" />
      </AppButton>
      <AppButton
        theme="blue-dark"
        size="l"
        class="navigation__button"
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
  $height: 3rem;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: $height;
  position: fixed;
  top: 3.5rem;
  left: 0;
  z-index: 90;
  background-color: var(--color-white);
  box-shadow: inset 0 1px 0 0 rgba($gray-dark, .2), 6px 6px 20px rgba($black, 0.2);
  user-select: none;

  &__tabs {
    width: 100%;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
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
      background-color: var(--color-blue-dark);

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
        border: .5rem solid transparent;
        border-top-width: #{$height / 2};
        border-bottom-width: #{$height / 2};
        border-left-color: var(--color-blue-dark);
      }
    }

    &--last {
      margin-left: 1rem;

      #{$parent}__tab-name {
        font-size: .75rem;
        color: var(--color-black);
      }
    }

    &--route {
      padding-left: 2rem;
      background-color:var(--color-red-dark);

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
        transform: skewX(21deg);
        background-color: var(--color-red-dark);
        transition: background-color var(--transition);
      }
    }

    &--active {

      &#{$parent}__tab {

        &--route {

          &:after {
            background-color: var(--color-red);
          }
        }
      }

      #{$parent}__tab-name {
        border-bottom-color: transparent;
      }
    }
  }

  &__tab-name {
    overflow: hidden;
    position: relative;
    z-index: 1;
    color: var(--color-white);
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
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    &:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-top: #{$height} solid transparent;
      border-right: #{$height / 2} solid var(--color-blue-dark);
    }
  }

  &__button {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>

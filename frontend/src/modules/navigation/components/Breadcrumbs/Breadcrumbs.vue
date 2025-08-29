<script setup lang="ts">
import {
  type RouteLocationMatched,
  useRoute,
} from 'vue-router';
import { computed } from 'vue';
import type { NavigationBreadcrumbs } from '../../types';
import type { HTMLElementClass } from '@/common/types';

const route = useRoute();

const breadcrumbs = computed<NavigationBreadcrumbs[]>(() => {
  return route.matched.reduce((acc: NavigationBreadcrumbs[], item: RouteLocationMatched) => {
    const exists: NavigationBreadcrumbs | undefined = acc.find((current: NavigationBreadcrumbs) => {
      return current.label === item.meta.menuLabel;
    });

    if (exists) {
      return acc;
    }

    return [
      ...acc,
      {
        label: item.meta.menuLabel,
        name: item.name,
        route: {
          name: item.name,
        },
      },
    ];
  }, []);
});

function routerLinkClass(index: number): HTMLElementClass {
  return {
    'breadcrumbs__item--first': index === 0,
    'breadcrumbs__item--route': index !== 0,
  };
}
</script>

<template>
  <div class="breadcrumbs">
    <RouterLink
      v-for="(item, index) in breadcrumbs"
      :key="item.name"
      :to="item.route"
      class="breadcrumbs__item"
      :class="routerLinkClass(index)"
    >
      <span class="breadcrumbs__item-name">{{ item.label }}</span>
    </RouterLink>
  </div>
</template>

<style lang="scss">
.breadcrumbs {
  $parent: &;
  $height: 3rem;

  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;

  &__item {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    max-width: 30%;
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

  &__item-name {
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
}
</style>

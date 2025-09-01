<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';
import { navigation } from '@/app/router/navigation';
import type { RouteNames } from '@/app/router/route-names';

function goTo(name: RouteNames): RouteLocationRaw {
  return {
    name,
  };
}
</script>

<template>
  <nav class="app-navigation">
    <ul class="app-navigation__list">
      <li
        v-for="item in navigation"
        :key="item.routeName"
        class="app-navigation__item"
      >
        <RouterLink
          :to="goTo(item.routeName)"
          class="app-navigation__link"
          active-class="app-navigation__link--active"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.app-navigation {
  display: flex;
  justify-content: center;
  height: 100%;

  &__list {
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    margin: 0;
  }

  &__link {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    position: relative;
    color: var(--color-red);
    font-size: .75rem;
    transition: color var(--transition), box-shadow var(--transition);

    &--active {
      box-shadow: inset 0 4px 0 0 var(--color-red);
    }
  }
}
</style>

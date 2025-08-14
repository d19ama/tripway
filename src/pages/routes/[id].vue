<script setup lang="ts">
import {
  RouteSection,
  useRoutes,
} from '@/modules/routes';

const {
  activeRoute,
} = useRoutes();

function addNewSection(): void {}
</script>

<template>
  <div class="route-page">
    <div class="route-page__border route-page__border--start icon icon-home" />
    <template v-if="activeRoute">
      <RouteSection
        v-for="item in activeRoute.route"
        :key="item.id"
        :data="item"
      />
    </template>
    <div
      class="route-page__border route-page__border--end icon icon-plus"
      @click="addNewSection"
    />
  </div>
</template>

<style lang="scss">
.route-page {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: flex-start;
  align-content: flex-start;
  flex-grow: 1;
  gap: 2rem 1rem;

  &__border {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    flex-grow: 0;
    width: 150px;
    height: 150px;
    position: relative;
    z-index: 2;
    border-radius: 4px;
    color: var(--color-white);
    font-size: 6rem;
    box-shadow: 0 0 0 5px var(--color-white), 6px 6px 20px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    @include breakpoint(mobile) {
      width: 100%;
      margin-right: 0;
    }

    &--start {
      margin-right: 1rem;
      background-color: var(--color-green);
    }

    &--end {
      background-color: var(--color-yellow-dark);
      transition: background-color var(--transition);

      &:hover {
        background-color: var(--color-yellow);
      }
    }
  }
}
</style>

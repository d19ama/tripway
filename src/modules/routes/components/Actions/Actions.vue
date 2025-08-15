<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRoutes } from '@/modules/routes';

const {
  closeRoute,
} = useRoutes();

const route = useRoute();

function saveRoute(): void {}

function removeRoute(): void {}
</script>

<template>
  <section class="actions">
    <button
      class="actions__button"
      @click="saveRoute"
    >
      Сохранить
    </button>
    <button
      class="actions__button"
      @click="closeRoute(String(route.params.id))"
    >
      Закрыть
    </button>
    <button
      class="actions__button"
      @click="removeRoute"
    >
      Удалить
    </button>
  </section>
</template>

<style lang="scss">
.actions {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  justify-self: center;
  height: 3rem;
  position: relative;
  user-select: none;

  &__label {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    z-index: 2;
    background-color: var(--color-white);
  }

  &__button {
    height: 100%;
    padding: .5rem 1rem;
    position: relative;
    z-index: 2;
    border: none;
    font-size: .75rem;
    color: var(--color-white);
    background-color: var(--color-red);
    transition: background-color var(--transition);
    cursor: pointer;

    &:not(:last-of-type) {
      border-right: 1px solid var(--color-red-dark);
    }

    &:first-of-type {

      &:before {
        content: '';
        display: block;
        width: 2rem;
        height: 100%;
        position: absolute;
        top: 0;
        right: calc(100% - 1rem);
        z-index: 1;
        background-color: var(--color-red);
        transition: background-color var(--transition);
        transform-origin: center;
        transform: skewX(22deg);
      }
    }

    &:last-of-type {

      &:after {
        content: '';
        display: block;
        width: 2rem;
        height: 100%;
        position: absolute;
        top: 0;
        left: calc(100% - 1rem);
        z-index: 1;
        background-color: var(--color-red);
        transition: background-color var(--transition);
        transform-origin: center;
        transform: skewX(-22deg);
      }
    }

    &:hover {
      background-color: var(--color-red-dark);

      &:before,
      &:after {
        background-color: var(--color-red-dark);
      }
    }
  }
}
</style>

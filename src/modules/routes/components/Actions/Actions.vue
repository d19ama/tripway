<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRoutes } from '@/modules/routes';

const {
  closeRoute,
} = useRoutes();

const route = useRoute();

function saveToPDF(): void {}
</script>

<template>
  <section class="actions">
    <button
      class="actions__button"
      @click="saveToPDF"
    >
      Сохранить в PDF
    </button>
    <button
      class="actions__button"
      @click="closeRoute(String(route.params.id))"
    >
      Закрыть
    </button>
    <button class="actions__button">
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
  position: relative;
  user-select: none;

  &:before,
  &:after {
    content: '';
    display: block;
    width: 1rem;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: var(--color-red);
    transform-origin: center;
    transition: background-color var(--transition);
  }

  &:before {
    left: -.5rem;
    transform: skewX(22deg);
  }

  &:after {
    right: -.5rem;
    transform: skewX(-22deg);
  }

  &__button {
    padding: .5rem 1rem;
    border: none;
    font-size: .75rem;
    color: var(--color-white);
    background-color: var(--color-red);
    cursor: pointer;

    &:not(:last-of-type) {
      border-right: 1px solid var(--color-red-dark);
    }
  }
}
</style>

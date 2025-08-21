<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  computed,
  ref,
} from 'vue';
import {
  CloseRouteConfirmationModal,
  DeleteRouteConfirmationModal,
} from '../';
import {
  type Route,
  useRoutes,
} from '../../';
import type { RouteState } from '@/modules/routes/types';

const {
  activeRoute,
  editRoute,
  closeRoute,
} = useRoutes();

const route = useRoute();

const selectedRouteId = ref<Route['id']>(String(route.params.id));
const isCloseConfirmationModalVisible = ref<boolean>(false);
const isDeleteConfirmationModalVisible = ref<boolean>(false);

const state = computed<RouteState>(() => {
  return activeRoute.value?.state || 'completed';
});

function edit(): void {
  editRoute(String(route.params.id));
}

function save(): void {}

function close(): void {
  if (state.value === 'edit' || state.value === 'new') {
    isCloseConfirmationModalVisible.value = true;
    return;
  }

  closeRoute(String(route.params.id));
}

function remove(): void {
  isDeleteConfirmationModalVisible.value = true;
}
</script>

<template>
  <section class="actions">
    <button
      v-if="state === 'completed'"
      class="actions__button"
      @click="edit"
    >
      Редактировать
    </button>
    <button
      v-if="state === 'edit'"
      class="actions__button"
      @click="save"
    >
      Сохранить
    </button>
    <button
      class="actions__button"
      @click="close"
    >
      Закрыть
    </button>
    <button
      v-if="state === 'completed'"
      class="actions__button"
      @click="remove"
    >
      Удалить
    </button>
  </section>

  <CloseRouteConfirmationModal
    v-model:visible="isCloseConfirmationModalVisible"
  />

  <DeleteRouteConfirmationModal
    v-model:visible="isDeleteConfirmationModalVisible"
    :route-id="selectedRouteId"
  />
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

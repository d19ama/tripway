<script setup lang="ts">
import {
  AppButton,
  AppTitle,
} from '@/common';
import type { Route } from '@/modules/routes';

interface Emits {
  'open:route': [id: Route['id']];
  'close:route': [id: Route['id']];
}

const emit = defineEmits<Emits>();

const route = defineModel<Route>('route', {
  required: false,
});

function openRoute(id: Route['id']): void {
  emit('open:route', id);
}

function closeRoute(id: Route['id']): void {
  emit('close:route', id);
}
</script>

<template>
  <section class="list-item">
    <div
      v-if="route"
      class="row"
    >
      <div class="col-default-8">
        <div class="list-item__info">
          <span class="list-item__caption icon icon-file-text2 margin-right--xs" />
          <AppTitle
            tag="h4"
            weight="normal"
            class="list-item__value"
          >
            {{ route.name }}
          </AppTitle>
        </div>
        <div class="list-item__info margin-top--xxs">
          <span class="list-item__caption icon icon-calendar margin-right--xs" />
          <span class="list-item__value list-item__value--date">
            {{ route.date[0] }}
            &#8212;
            {{ route.date[1] }}
          </span>
        </div>
        <div class="list-item__info margin-top--xxs">
          <span class="list-item__caption icon icon-credit-card margin-right--xs" />
          <span class="list-item__value">
            {{ route.costs?.toLocaleString() }}
          </span>
        </div>
      </div>
      <div class="col-default-4">
        <div class="list-item__buttons">
          <AppButton
            v-if="!route.opened"
            rounded
            theme="border-green"
            @click="openRoute(route.id)"
          >
            Открыть
          </AppButton>
          <AppButton
            v-if="route.opened"
            rounded
            theme="border-yellow"
            @click="closeRoute(route.id)"
          >
            Закрыть
          </AppButton>
          <AppButton
            rounded
          >
            Удалить
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.list-item {
  padding: 1.5rem;
  border-radius: .25rem;
  background-color: var(--color-white);
  cursor: default;

  &+& {
    margin-top: 1rem;
  }

  &__info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  &__caption {
    color: $blue-dark;
  }

  &__value {

    &--date {
      display: inline-block;
      padding: .5rem;
      font-size: .875rem;
      color: rgba($blue-dark, .5);
      border-radius: .25rem;
      background-color: $gray-lite;
    }
  }

  &__buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 100%;
    gap: 1rem;
  }
}
</style>

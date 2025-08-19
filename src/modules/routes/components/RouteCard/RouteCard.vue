<script setup lang="ts">
import {
  AppButton,
  AppTitle,
  AppTooltip,
} from '@/common/components';
import type { Route } from '@/modules/routes';
import {
  currency,
  date,
} from '@/common/format';

interface Props {
  route: Route;
}

interface Emits {
  'click': [id: Route['id']];
  'edit:route': [id: Route['id']];
  'close:route': [id: Route['id']];
  'remove:route': [id: Route['id']];
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();
</script>

<template>
  <section class="route-card">
    <div
      class="route-card__info"
      @click="emit('click', props.route.id)"
    >
      <div class="route-card__info-block">
        <span class="route-card__caption icon icon-file-text2 margin-right--xs" />
        <AppTitle
          tag="h4"
          weight="normal"
          class="route-card__value"
        >
          {{ props.route.name }}
        </AppTitle>
      </div>
      <div class="route-card__info-block margin-top--xs">
        <span class="route-card__caption icon icon-calendar margin-right--xs" />
        <span class="route-card__value route-card__value--date">
          {{ date(props.route.date[0], 'Long') }}
          &#8212;
          {{ date(props.route.date[1], 'Long') }}
        </span>
      </div>
      <div class="route-card__info-block margin-top--xs">
        <span class="route-card__caption icon icon-credit-card margin-right--xs" />
        <span class="route-card__value">
          {{ currency(props.route.costs) }}
        </span>
      </div>
    </div>
    <div class="route-card__buttons">
      <AppTooltip v-if="!props.route.opened">
        <template #activator>
          <AppButton
            v-if="!props.route.opened"
            size="m"
            theme="transparent"
            @click="emit('edit:route', props.route.id)"
          >
            <span class="icon icon-pencil" />
          </AppButton>
        </template>
        Редактировать&nbsp;маршрут
      </AppTooltip>
      <AppTooltip v-if="props.route.opened">
        <template #activator>
          <AppButton
            v-if="props.route.opened"
            size="m"
            theme="transparent"
            @click="emit('close:route', props.route.id)"
          >
            <span class="icon icon-cross" />
          </AppButton>
        </template>
        Закрыть&nbsp;маршрут
      </AppTooltip>
      <AppTooltip>
        <template #activator>
          <AppButton
            size="m"
            theme="transparent"
            @click="emit('remove:route', props.route.id)"
          >
            <span class="icon icon-bin" />
          </AppButton>
        </template>
        Удалить&nbsp;маршрут
      </AppTooltip>
    </div>
  </section>
</template>

<style lang="scss">
.route-card {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: .25rem;
  position: relative;
  border-radius: .5rem;
  box-shadow: 6px 6px 20px rgba($black, 0.2);
  cursor: default;

  &:before {
    content: '';
    width: 1rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius: .5rem 0 0 .5rem;
    background-color: var(--color-blue-dark);
    transition: background-color var(--transition);
  }

  &:hover {

    &:before {
      background-color: var(--color-red);
    }
  }

  &__info {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    align-self: stretch;
    justify-content: space-around;
    flex-grow: 1;
    padding: 1.5rem 1.5rem 1.5rem 2rem;
    border-radius: .5rem 0 0 .5rem;
    background-color: var(--color-white);
    cursor: pointer;
  }

  &__info-block {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  &__caption {
    font-size: 1.5rem;
    color: var(--color-blue-dark);
  }

  &__value {

    &--date {
      display: inline-block;
      padding: .5rem;
      font-size: .875rem;
      color: rgba($blue-dark, .5);
      border-radius: .25rem;
      background-color: var(--color-gray-lite);
    }
  }

  &__buttons {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    align-self: stretch;
    justify-content: space-around;
    flex-grow: 0;
    flex-shrink: 0;
    width: 6rem;
    gap: 1rem;
    position: relative;
    padding: 1.5rem;
    border-radius: 0 .5rem .5rem 0;
    background-color: var(--color-white);

    &:before {
      content: '';
      display: block;
      width: .25rem;
      height: 100%;
      position: absolute;
      top: 0;
      right: 100%;
      background: repeating-linear-gradient(0deg, var(--color-white), var(--color-white) 4px, transparent 4px, transparent 8px);
    }
  }
}
</style>

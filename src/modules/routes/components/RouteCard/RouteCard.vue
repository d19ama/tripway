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
  'edit:route': [id: Route['id']];
  'open:route': [id: Route['id']];
  'close:route': [id: Route['id']];
  'remove:route': [id: Route['id']];
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();
</script>

<template>
  <section class="route-card">
    <div class="row">
      <div class="col-default-8">
        <div class="route-card__info">
          <span class="route-card__caption icon icon-file-text2 margin-right--xs" />
          <AppTitle
            tag="h4"
            weight="normal"
            class="route-card__value"
          >
            {{ props.route.name }}
          </AppTitle>
        </div>
        <div class="route-card__info margin-top--xs">
          <span class="route-card__caption icon icon-calendar margin-right--xs" />
          <span class="route-card__value route-card__value--date">
            {{ date(props.route.date[0], 'Long') }}
            &#8212;
            {{ date(props.route.date[1], 'Long') }}
          </span>
        </div>
        <div class="route-card__info margin-top--xs">
          <span class="route-card__caption icon icon-credit-card margin-right--xs" />
          <span class="route-card__value">
            {{ currency(props.route.costs) }}
          </span>
        </div>
      </div>
      <div class="col-default-4">
        <div class="route-card__buttons">
          <AppTooltip v-if="!props.route.opened">
            <template #activator>
              <AppButton
                v-if="!props.route.opened"
                rounded
                size="l"
                auto-width
                theme="border-blue"
                @click="emit('open:route', props.route.id)"
              >
                <span class="icon icon-folder-open" />
              </AppButton>
            </template>
            Открыть маршрут
          </AppTooltip>
          <AppTooltip v-if="!props.route.opened">
            <template #activator>
              <AppButton
                v-if="!props.route.opened"
                rounded
                size="l"
                auto-width
                theme="border-green"
                @click="emit('edit:route', props.route.id)"
              >
                <span class="icon icon-pencil" />
              </AppButton>
            </template>

            Редактировать маршрут
          </AppTooltip>
          <AppTooltip v-if="props.route.opened">
            <template #activator>
              <AppButton
                v-if="props.route.opened"
                rounded
                size="l"
                auto-width
                theme="border-yellow"
                @click="emit('close:route', props.route.id)"
              >
                <span class="icon icon-cross" />
              </AppButton>
            </template>
            Закрыть маршрут
          </AppTooltip>
          <AppTooltip>
            <template #activator>
              <AppButton
                rounded
                size="l"
                auto-width
                theme="border-red"
                @click="emit('remove:route', props.route.id)"
              >
                <span class="icon icon-bin" />
              </AppButton>
            </template>

            Удалить маршрут
          </AppTooltip>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.route-card {
  margin-left: 1.5rem;
  padding: 1.5rem 1.5rem 1.5rem 1rem;
  position: relative;
  border-radius: 0 .5rem .5rem 0;
  background-color: var(--color-white);
  cursor: default;

  &:before {
    content: '';
    display: block;
    width: 1.5rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 100%;
    border-right: .125rem dashed var(--color-gray-dark);
    border-radius: .5rem 0 0 .5rem;
    background-color: var(--color-white);
  }

  &__info {
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
    flex-flow: row wrap;
    align-items: stretch;
    justify-content: flex-end;
    height: 100%;
    gap: 1rem;
  }
}
</style>

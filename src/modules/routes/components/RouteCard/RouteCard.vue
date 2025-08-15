<script setup lang="ts">
import {
  AppButton,
  AppTitle,
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
  'open:route': [id: Route['id']];
  'close:route': [id: Route['id']];
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

function openRoute(): void {
  emit('open:route', props.route.id);
}

function closeRoute(): void {
  emit('close:route', props.route.id);
}
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
          <AppButton
            v-if="!props.route.opened"
            rounded
            theme="green"
            @click="openRoute"
          >
            Открыть
          </AppButton>
          <AppButton
            v-if="props.route.opened"
            rounded
            theme="yellow"
            @click="closeRoute"
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
.route-card {
  padding: 1.5rem;
  border-radius: .25rem;
  background-color: var(--color-white);
  cursor: default;

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
      background-color: var(--color-gray-lite);
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

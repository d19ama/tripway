<script setup lang="ts">
import { computed } from 'vue';
import type {
  RouteSectionEntity,
  TransportType,
} from '../../types';
import {
  currency,
  date,
} from '@/common/format';
import { DASH_SYMBOL } from '@/common/constants';
import {
  iconAirplane,
  iconBicycle,
  iconBus,
  iconCar,
  iconTrain,
} from '@/app/assets/images/icons';
import type { HTMLElementClass } from '@/common/types';

interface Props {
  data: RouteSectionEntity;
  isLast: boolean;
  isFirst: boolean;
}

const props = defineProps<Props>();

const transport = computed<string | undefined>(() => {
  const resolver: Record<TransportType, string> = {
    airplane: iconAirplane,
    train: iconTrain,
    bus: iconBus,
    car: iconCar,
    bicycle: iconBicycle,
    other: '',
  };

  return resolver[props.data.transportType!];
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'route-section--last': props.isLast,
    'route-section--first': props.isFirst,
  };
});

function price(value: string | undefined): string {
  return value
    ? currency(+value)
    : DASH_SYMBOL;
}
</script>

<template>
  <div
    class="route-section"
    :class="elementClass"
  >
    <div class="route-section__inner">
      <div class="route-section__info">
        <div class="route-section__date">
          <span class="icon icon-calendar" />
          {{ date(props.data.departure) }}
          &dash;
          {{ date(props.data.arrival) }}
          <div
            v-if="transport"
            class="route-section__transport"
          >
            <img
              :src="transport"
              :alt="props.data.transportType"
              class="route-section__transport-img"
            >
          </div>
        </div>
        <div class="route-section__location">
          <span class="icon icon-location" />
          {{ props.data.destinationCountry }}, {{ props.data.destinationCity }}
        </div>
        <div class="route-section__price">
          <div class="row">
            <div class="col-default-6">
              <div class="route-section__name">
                Билеты:
              </div>
              <div class="route-section__value">
                {{ price(props.data.movingCost) }}
              </div>
            </div>
            <div class="col-default-6">
              <div class="route-section__name">
                Проживание:
              </div>
              <div class="route-section__value">
                {{ price(props.data.stayingCost) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.route-section {
  $parent: &;
  $box-shadow: .5rem .5rem 1rem rgba($black, .2);

  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;
  flex-grow: 1;
  min-width: 20%;
  max-width: 25%;
  height: 10rem;
  position: relative;
  cursor: pointer;

  @include breakpoint(xl) {
    min-width: 20%;
    max-width: 25%;
  }

  @include breakpoint(lg) {
    min-width: calc(100% / 3);
    max-width: 50%;
  }

  @include breakpoint(md) {
    min-width: calc(100% / 3);
    max-width: 50%;
  }

  @include breakpoint(sm) {
    min-width: 100%;
    max-width: 100%;
  }

  @include breakpoint(xs) {
    min-width: 100%;
    max-width: 100%;
  }

  &:before {
    content: '';
    display: block;
    width: calc(100% + 4rem);
    height: 33%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -2rem;
    z-index: 1;
    background-color: var(--color-gray-lite);
  }

  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    box-sizing: border-box;
    margin: auto 0;
    z-index: 2;
    border: 1rem solid transparent;
    border-right-width: .5rem;
    border-top-width: 5rem;
    border-bottom-width: 5rem;
    border-left-color: var(--color-gray-lite);
    transition: border-color var(--transition);
  }

  &--first {
    &:before {
      width: 100%;

      @include breakpoint(sm) {
        width: calc(100% + 4rem);
      }
    }
  }

  &--last {
    &:before {
      width: calc(100% + 2rem);

      @include breakpoint(sm) {
        width: calc(100% + 4rem);
      }
    }

    &:after {
      position: absolute;
      right: 34px;
      transform: rotate(180deg);

      @include breakpoint(sm) {
        position: static;
        transform: none;
      }
    }
  }

  &__inner {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: space-between;
    width: calc(100% - 34px);
    overflow: hidden;
    z-index: 2;
    border-radius: 3px;
    background-color: var(--color-white);
    box-shadow: $box-shadow;
    transition: all var(--transition);

    &:hover {

      #{$parent}__inner {
        box-shadow: $box-shadow;
      }
    }
  }

  &__info {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }

  &__date,
  &__location,
  &__price {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0 .5rem;
    height: calc(100% / 3);
    box-sizing: border-box;
    user-select: none;
  }

  &__date {
    padding: .5rem .75rem;
    position: relative;
    font-size: 1rem;
  }

  &__options {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    opacity: 0;
    padding: 0 .75rem 0 0;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity var(--transition);

    .icon {
      margin: .5rem auto;
    }
  }

  &__option {
    display: block;
    width: 2rem;
    height: 2rem;
    opacity: .3;
    transition: opacity var(--transition);

    &:hover {
      opacity: 1;
    }

    &--delete {
      .icon {
        color: var(--color-red);
      }
    }

    &--edit {
      .icon {
        color: var(--color-blue-dark);
      }
    }
  }

  &__location {
    padding: .25rem .75rem;
    font-size: 1rem;
    font-weight: 300;
    font-style: italic;
    background-color: var(--color-gray-lite);
    transition: background-color var(--transition), color var(--transition);
  }

  &__price {
    padding: .75rem .875rem;
    margin-top: auto;
  }

  &__name {
    margin: 0 .25rem 0 0;
    font-size: .875rem;
    font-weight: 400;
  }

  &__value {
    font-size: .875rem;
  }

  &__transport {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: auto;
    opacity: .25;
  }

  &__transport-img {
    max-width: 100%;
    max-height: 100%;
  }

  &:hover {

    &:after {
      border-left-color: var(--color-green);
    }

    #{$parent}__location {
      color: var(--color-white);
      background-color: var(--color-green);
    }

    #{$parent}__options {
      opacity: 1;
    }
  }
}
</style>

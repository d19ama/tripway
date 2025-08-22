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

interface Props {
  data: RouteSectionEntity;
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

function price(value: string | undefined): string {
  return value
    ? currency(+value)
    : DASH_SYMBOL;
}
</script>

<template>
  <div class="route-section">
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

  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;
  flex-grow: 1;
  min-width: 20%;
  max-width: calc(100%/3);
  height: 150px;
  position: relative;
  cursor: pointer;

  @include breakpoint(desktop) {
    min-width: 25%;
    max-width: calc(100%/3);
  }

  @include breakpoint(tablet) {
    min-width: 25%;
    max-width: 50%;
  }

  @include breakpoint(v-mobile) {
    min-width: calc(100%/3);
    max-width: 50%;
  }

  @include breakpoint(mobile) {
    display: flex;
    flex-flow: column wrap;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    margin: 0;
  }

  &:before {
    content: '';
    display: block;
    width: calc(100% + 80px);
    height: 33%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -40px;
    z-index: 1;
    background-color: var(--color-gray-lite);
    box-shadow: 6px 6px 20px rgba($black, 0.2);
  }

  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    box-sizing: border-box;
    margin: auto 0;
    z-index: 2;
    border: 20px solid transparent;
    border-right-width: 4px;
    border-top-width: 75px;
    border-bottom-width: 75px;
    border-left-color: var(--color-gray-lite);
    transition: border 0.3s;

    @include breakpoint(mobile) {
      margin: 0 auto;
      border: 15px solid transparent;
      border-bottom-width: 10px;
      border-top-color: var(--color-white);
    }
  }

  &:last-of-type:before {
    width: 100%;
  }

  &:last-of-type:after {
    position: absolute;
    right: 34px;
    transform: rotate(180deg);
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
    box-shadow: 6px 6px 20px rgba($black, 0.2);
    transition: all 0.3s;

    @include breakpoint(mobile) {
      width: 100%;
    }

    &:hover {

      #{$parent}__inner {
        box-shadow: 6px 6px 20px rgba($black, 0.4);
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
    padding: 10px 12px 8px;
    position: relative;
    font-size: 15px;
  }

  &__options {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    opacity: 0;
    padding: 0 10px 0 0;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity 0.3s;

    .icon {
      margin: 5px auto;
    }
  }

  &__option {
    display: block;
    width: 30px;
    height: 30px;
    opacity: 0.3;
    transition: opacity 0.3s;

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
    padding: 4px 12px;
    font-size: 16px;
    font-weight: 300;
    font-style: italic;
    background-color: var(--color-gray-lite);
    transition: background-color 0.3s, color 0.3s;
  }

  &__price {
    padding: 10px 12px 10px;
    margin-top: auto;
  }

  &__name {
    margin: 0 4px 0 0;
    font-size: 13px;
    font-weight: 400;
  }

  &__value {
    font-size: 13px;
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

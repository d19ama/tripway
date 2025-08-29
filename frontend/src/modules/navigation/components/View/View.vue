<script setup lang="ts">
import { AppButton } from '@/common/components';

function changeView(): void {
  console.warn('View changed!');
}
</script>

<template>
  <div class="view">
    <AppButton
      theme="blue-dark"
      size="l"
      class="view__button"
      @click="changeView"
    >
      <span class="icon icon-map" />
    </AppButton>
    <AppButton
      theme="blue-dark"
      size="l"
      class="view__button"
      @click="changeView"
    >
      <span class="icon icon-list" />
    </AppButton>
  </div>
</template>

<style lang="scss">
.view {
  $height: 3rem;

  display: flex;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: #{$height} solid transparent;
    border-right: #{$height / 2} solid var(--color-blue-dark);
  }

  &__button {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>

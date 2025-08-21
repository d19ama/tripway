<script lang="ts" setup>
import {
  onMounted,
  ref,
} from 'vue';

const DELAY: number = 2000;
const PATHS: string[] = [
  'm-1,-1.125l1155,565.125l766,-444',
  'm1919,232.875l-943,563.125l530,282',
  'm-1,848.875l1449,-848.875',
  'm1,138.875l855,411.125l-856,526',
  'm709,-1.125l1209,571.125',
  'm1921,574.875l-799,503.125',
  'm237,1076.875l659,-428.875l884,436',
  'm-3,420.875l189,87.125l908,-514',
  'm1,630.875l879,449.125',
];

const currentPath = ref<number>(0);
const blasted = ref<boolean>(false);

onMounted(() => {
  setInterval(animate, DELAY);
});

function animate(): void {
  currentPath.value = getRandomInt(0, 9);
}

function getRandomInt(min: number, max: number): number {
  const number: number = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);

  return currentPath.value === number
    ? getRandomInt(0, 9)
    : number;
}
</script>

<template>
  <div class="app-background">
    <svg
      viewBox="0 0 1920 1080"
      class="app-background__parent"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        v-for="(path, index) in PATHS"
        :key="index"
        :d="path"
        class="app-background__path"
        :class="{
          'app-background__path--animate app-background__path--active': currentPath === index || blasted,
        }"
      />
    </svg>
  </div>
</template>

<style lang="scss">
.app-background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;

  &__parent {

    @include breakpoint(tablet) {
      height: 100%;
    }
  }

  &__path {
    opacity: 0;
    fill: none;
    stroke: rgba(var(--color-black), .5);
    stroke-width: 1px;
    stroke-dasharray: 2200px;
    stroke-dashoffset: 2200px;

    &--animate {
      animation: stroke 2s infinite both;
      animation-play-state: paused;
    }

    &--active {
      animation-play-state: running;
    }
  }
}

@keyframes stroke {
  0% {
    stroke-dashoffset: 2200px;
  }

  25% {
    opacity: 1;
  }

  75% {
    opacity: 0;
  }

  100% {
    stroke-dashoffset: 0;
  }
}
</style>

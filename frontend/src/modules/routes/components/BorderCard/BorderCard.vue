<script setup lang="ts">
interface Props {
  icon: 'icon-home' | 'icon-plus';
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'icon-home',
});
</script>

<template>
  <div
    class="border-card icon"
    :class="props.icon"
  />
</template>

<style lang="scss">
.border-card {
  $shadow: 0 0 0 .5rem var(--color-white), .5rem .5rem 1rem rgba($black, 0.2);

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  width: 7rem;
  height: 7rem;
  position: relative;
  z-index: 2;
  border-radius: .25rem;
  color: var(--color-white);
  font-size: 4rem;
  box-shadow: $shadow;
  text-shadow: $shadow;
  cursor: pointer;

  @include breakpoint(mobile) {
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import {
  Breadcrumbs,
  View,
} from '../';
</script>

<template>
  <div class="navigation">
    <Breadcrumbs />
    <View />
  </div>
</template>

<style lang="scss">
.navigation {
  $height: 3rem;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: $height;
  position: fixed;
  top: 3.5rem;
  left: 0;
  z-index: 90;
  background-color: var(--color-white);
  box-shadow: 6px 6px 20px rgba($black, 0.2);
  user-select: none;
}
</style>

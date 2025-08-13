<script lang="ts" setup>
import {
  AppLogo,
  AppNavigation,
} from '../';
</script>

<template>
  <header class="app-header">
    <AppLogo />
    <AppNavigation />
  </header>
</template>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: flex-start;
  flex: 0 0 auto;
  height: 3rem;
  padding: 0 1.25rem;
  position: relative;
  z-index: 10;
  background-color: $white;
}
</style>

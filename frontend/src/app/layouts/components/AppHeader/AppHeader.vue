<script lang="ts" setup>
import {
  AppLogo,
  AppNavigation,
} from '../';
import { AppProfile } from '@/app/layouts';
</script>

<template>
  <header class="app-header">
    <AppLogo />
    <AppNavigation />
    <AppProfile
      class="app-header__profile"
    />
  </header>
</template>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;
  flex: 0 0 auto;
  gap: 0 3rem;
  height: 3.5rem;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: var(--color-white);
  box-shadow: inset 0 1px 0 0 rgba($gray-dark, .2), 6px 6px 20px rgba($black, 0.2);

  &__profile {
    margin-left: auto;
  }
}
</style>

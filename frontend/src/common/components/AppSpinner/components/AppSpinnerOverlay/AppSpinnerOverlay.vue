<script setup lang="ts">
import {
  AppSpinner,
  type AppSpinnerProps,
} from '../../';

const props = withDefaults(defineProps<AppSpinnerProps>(), {
  size: 'l',
});
</script>

<template>
  <div class="app-spinner-overlay">
    <AppSpinner
      :size="props.size"
    />
  </div>
</template>

<style lang="scss">
.app-spinner-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba($white, .6);
}
</style>

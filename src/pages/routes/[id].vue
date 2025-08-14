<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div>route id: {{ route.params.id }}</div>
</template>

<style lang="scss">
.container {
  // styles
}
</style>

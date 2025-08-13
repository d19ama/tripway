<script setup lang="ts">
import { ref } from 'vue';
import {
  List,
  Navigation,
  type Route,
} from '@/modules/routes';
import { AppPage } from '@/common';

const routes = ref<Route[]>([
  {
    id: '0',
    name: 'First route',
    opened: false,
    selected: false,
    costs: 200000,
    date: [
      1625153594,
      1625153594,
    ],
  },
  {
    id: '1',
    name: 'Second route',
    opened: false,
    selected: false,
    costs: 250000,
    date: [
      1625153594,
      1625153594,
    ],
  },
]);
</script>

<template>
  <AppPage>
    <template #header>
      <Navigation
        v-model:routes="routes"
      />
    </template>
    <template #content>
      <List
        v-model:routes="routes"
      />
    </template>
  </AppPage>
</template>

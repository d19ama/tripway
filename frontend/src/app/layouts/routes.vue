<script setup lang="ts">
import {
  AppContent,
  AppFooter,
  AppHeader,
} from './components';
import { Navigation } from '@/modules/routes';
</script>

<template>
  <AppHeader />
  <Navigation />
  <AppContent />
  <AppFooter />
</template>

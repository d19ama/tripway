<script setup lang="ts">
import {
  AppContent,
  AppFooter,
  AppHeader,
} from './components';
import { Navigation } from '@/modules/navigation';
</script>

<template>
  <AppHeader />
  <Navigation />
  <AppContent />
  <AppFooter />
</template>

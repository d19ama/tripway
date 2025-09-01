<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AppLogo } from '../';
import {
  AppNavigation,
  AppProfile,
} from '@/app/layouts';
import { AuthModal } from '@/modules/auth';
import { RegistrationModal } from '@/modules/registration';
import {
  type UserEntity,
  useUsers,
} from '@/modules/users';
import { RouteNames } from '@/app/router/route-names';
import { usePageLoadingIndicator } from '@/common/composables';

const {
  isAuthorized,
  readUser,
} = useUsers();

const {
  showUntil,
} = usePageLoadingIndicator();

const router = useRouter();

const isAuthModalVisible = ref<boolean>(false);
const isRegistrationModalVisible = ref<boolean>(false);

function openAuthModal(): void {
  isAuthModalVisible.value = true;
}

async function onAuthSuccess(email: UserEntity['email']): Promise<void> {
  await showUntil(readUser(email));
  await router.replace({
    name: RouteNames.RoutesList,
  });
}

function openRegistrationModal(): void {
  isRegistrationModalVisible.value = true;
}

function onRegistrationSuccess(): void {
  router.replace({
    name: RouteNames.RoutesList,
  });
}
</script>

<template>
  <header class="app-header">
    <AppLogo />

    <div class="app-header__divider margin-left--auto" />
    <AppNavigation
      v-if="isAuthorized"
    />
    <AppProfile
      @open:auth-modal="openAuthModal"
    />
  </header>

  <AuthModal
    v-model:visible="isAuthModalVisible"
    @auth:success="onAuthSuccess"
    @open:registration-modal="openRegistrationModal"
  />

  <RegistrationModal
    v-model:visible="isRegistrationModalVisible"
    @registration:success="onRegistrationSuccess"
  />
</template>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;
  flex: 0 0 auto;
  gap: 0 .5rem;
  height: 3.5rem;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: var(--color-white);
  box-shadow: 6px 6px 20px rgba($black, 0.2);

  &__divider {
    width: 0;
    height: 100%;
  }
}
</style>

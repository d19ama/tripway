<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  useTemplateRef,
} from 'vue';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import type { HTMLElementClass } from '@/common/types';
import { AppLink } from '@/common/components';
import {
  AuthModal,
  useAuth,
  useToken,
} from '@/modules/auth';
import { RegistrationModal } from '@/modules/registration';
import { RouteNames } from '@/app/router/route-names';
import {
  type UserEntity,
  useUsers,
} from '@/modules/users';
import { usePageLoadingIndicator } from '@/common/composables';

const router = useRouter();

const {
  isAuthenticated,
} = useToken();

const {
  logout,
} = useAuth();

const {
  user,
  readUser,
} = useUsers();

const {
  showUntil,
} = usePageLoadingIndicator();

const isMenuVisible = ref<boolean>(false);
const isAuthModalVisible = ref<boolean>(false);
const isRegistrationModalVisible = ref<boolean>(false);

const menuRef = useTemplateRef<HTMLElement>('menuRef');

const isAuthorized = computed<boolean>(() => {
  return user.value !== undefined;
});

const userName = computed<string>(() => {
  if (!user.value) {
    return '';
  }

  if (user.value.nickname) {
    return user.value.nickname;
  }

  const [
    firstLetter,
  ] = user.value.surname.split('');

  return `${user.value.name} ${firstLetter}.`;
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-profile--active': isMenuVisible.value,
  };
});

function openMenu(): void {
  isMenuVisible.value = !isMenuVisible.value;
}

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

function openProfile(): void {
  router.replace({
    name: RouteNames.Profile,
  });
}

onClickOutside(menuRef, () => {
  isMenuVisible.value = false;
});

onMounted(async () => {
  if (isAuthenticated.value) {
    await showUntil(readUser('mr.anpilov@vk.com'));
  }
});
</script>

<template>
  <div
    class="app-profile"
    :class="elementClass"
    @click="openMenu"
  >
    <span
      v-if="isAuthorized"
      class="app-profile__name"
    >
      {{ userName }}
    </span>
    <AppLink
      v-else
      @click.prevent="openAuthModal"
    >
      Войти
    </AppLink>
    <div class="app-profile__photo">
      <svg
        class="app-profile__icon"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M28.3,23.1c-0.8-0.6-1.8-0.8-2.9-1.1c-1.2-0.3-2.4-0.5-3.3-1.3L22,20.6c0,0-0.5-0.4-0.6-0.9c-0.1-0.5,0.1-1,0.6-1.6l0,0c1.9-2.4,2.8-4.8,2.8-7.2C24.8,5.9,20.8,2,16,2s-8.8,3.9-8.8,8.8c0,2.2,0.9,4.7,2.8,7.2l0,0c0.5,0.6,0.7,1.2,0.6,1.7c-0.1,0.6-0.6,0.9-0.6,0.9l-0.2,0.1c-0.9,0.8-2.1,1.1-3.3,1.3c-1.1,0.2-2.1,0.5-2.9,1.1c-1.4,1.1-1.6,2.7-1.6,3.3l0,3.6h27.8l0-3.5C30,25.8,29.7,24.2,28.3,23.1z M4,28v-0.7l0-1c0,0,0-1,0.9-1.7c0.4-0.3,1.2-0.5,2-0.7c1.3-0.3,2.9-0.6,4.2-1.8c0.3-0.2,1.2-0.9,1.4-2.1c0.2-1.1-0.1-2.2-0.9-3.3l0,0c-1.6-2.2-2.4-4.3-2.4-6C9.2,7,12.3,4,16,4s6.8,3,6.8,6.8c0,2-0.8,3.9-2.4,6l0,0c-0.8,1.1-1.2,2.2-1,3.2c0.2,1.3,1.2,2,1.5,2.2c1.3,1.1,2.9,1.5,4.2,1.8c0.8,0.2,1.6,0.4,2,0.7c0.9,0.7,0.8,1.7,0.8,1.8l0,1.6H4z"
        />
      </svg>
    </div>
    <div
      v-if="isAuthorized && isMenuVisible"
      ref="menuRef"
      class="app-profile__menu"
    >
      <div
        class="app-profile__menu-item"
        @click="openProfile"
      >
        <span class="icon icon-profile" />
        Профиль
      </div>
      <div
        class="app-profile__menu-item"
        @click="logout"
      >
        <span class="icon icon-exit" />
        Выйти
      </div>
    </div>

    <AuthModal
      v-model:visible="isAuthModalVisible"
      @auth:success="onAuthSuccess"
      @open:registration="openRegistrationModal"
    />

    <RegistrationModal
      v-model:visible="isRegistrationModalVisible"
      @registration:success="onRegistrationSuccess"
    />
  </div>
</template>

<style lang="scss">
.app-profile {
  $parent: &;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  gap: 0 .5rem;
  position: relative;
  border-left: 1px solid transparent;
  transition: border-color var(--transition);
  cursor: pointer;

  &__name {
    font-size: .75rem;
    color: var(--color-red);
  }

  &__photo {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid var(--color-red);
    background-color: var(--color-white);
  }

  &__icon {
    width: 60%;
    height: 60%;
    color: var(--color-red);
  }

  &__menu {
    width: 7rem;
    overflow: hidden;
    position: absolute;
    top: calc(100% + .5rem);
    right: 0;
    z-index: 80;
    border-radius: .25rem;
    background-color: var(--color-white);
  }

  &__menu-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: .5rem;
    padding: .75rem;
    font-size: .75rem;
    user-select: none;
    cursor: pointer;

    &:hover {
      color: var(--color-red);
      background-color: var(--color-gray-lite);
    }
  }
}
</style>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  useTemplateRef,
} from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { HTMLElementClass } from '@/common/types';
import {
  AppLink,
  AppTooltip,
} from '@/common/components';
import { useAuth } from '@/modules/auth';
import { useUsers } from '@/modules/users';
import { usePageLoadingIndicator } from '@/common/composables';

interface Emits {
  'open:auth-modal': [];
}

const emit = defineEmits<Emits>();

const {
  logout,
  authenticate,
} = useAuth();

const {
  user,
  isAuthorized,
} = useUsers();

const {
  showUntil,
} = usePageLoadingIndicator();

const isMenuVisible = ref<boolean>(false);
const menuRef = useTemplateRef<HTMLElement>('menuRef');

const initials = computed<string>(() => {
  if (!user.value) {
    return '';
  }

  const [
    nameFirstLetter,
  ] = user.value.name.split('');

  const [
    surnameFirstLetter,
  ] = user.value.surname.split('');

  return `${nameFirstLetter}${surnameFirstLetter}`;
});

const elementClass = computed<HTMLElementClass>(() => {
  return {
    'app-profile--active': isMenuVisible.value,
  };
});

function openMenu(): void {
  isMenuVisible.value = !isMenuVisible.value;
}

onClickOutside(menuRef, () => {
  isMenuVisible.value = false;
});

onMounted(async () => {
  await showUntil(authenticate());
});
</script>

<template>
  <div
    class="app-profile"
    :class="elementClass"
    @click="openMenu"
  >
    <template v-if="isAuthorized">
      <AppTooltip trigger="click">
        <template #activator>
          <div class="app-profile__avatar">
            {{ initials }}
          </div>
        </template>
        <div
          class="app-profile__menu-item"
          @click="logout"
        >
          <span class="icon icon-exit" />
          Выйти
        </div>
      </AppTooltip>
    </template>

    <AppLink
      v-else
      class="app-profile__link"
      @click.prevent="emit('open:auth-modal')"
    >
      <span class="icon icon-enter" />
      Войти
    </AppLink>
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
  font-size: .875rem;
  border-left: 1px solid transparent;
  transition: border-color var(--transition);
  cursor: pointer;

  &__name {
    color: var(--color-red);
  }

  &__link {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: .5rem;
    font-size: .875rem;
    line-height: 1;
  }

  &__avatar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    overflow: hidden;
    border-radius: 50%;
    color: var(--color-red);
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
    padding: .5rem;
    font-size: .875rem;
    user-select: none;

    &:hover {
      color: var(--color-red);
      cursor: pointer;
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRegistration } from '../../../composables';
import { DEFAULT_REGISTRATION } from '../../../constants';
import type { RegistrationRequestDto } from '../../../types';
import {
  AppButton,
  AppModal,
} from '@/common/components';
import { usePageLoadingIndicator } from '@/common/composables';
import { RouteNames } from '@/app/router/route-names';

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const {
  isError,
  register,
} = useRegistration();

const {
  showUntil,
} = usePageLoadingIndicator();

const router = useRouter();

const form = ref<RegistrationRequestDto>({
  ...DEFAULT_REGISTRATION,
  // name: 'Артём',
  // surname: 'Анпилов',
  // patronymic: 'Михайлович',
  // email: 'mr.anpilov@vk.com',
  // password: 'Z1tomem=1',
});

async function onRegistration(): Promise<void> {
  await showUntil(register(form.value));
  visible.value = false;

  if (!isError.value) {
    await router.replace({
      name: RouteNames.RoutesList,
    });
  }
}
</script>

<template>
  <AppModal
    v-model:visible="visible"
    size="s"
    title="Регистрация"
  >
    <AppButton @click="onRegistration">
      Зарегистрироваться
    </AppButton>
  </AppModal>
</template>

<style lang="scss">
.container {
  // styles
}
</style>

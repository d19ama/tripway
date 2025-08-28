<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  type ValidationArgs,
  useVuelidate,
} from '@vuelidate/core';
import { useRegistration } from '../../../composables';
import { DEFAULT_REGISTRATION } from '../../../constants';
import type { RegistrationRequestDto } from '../../../types';
import {
  AppButton,
  AppModal,
  AppModalActions,
} from '@/common/components';
import { usePageLoadingIndicator } from '@/common/composables';

interface Emits {
  'registration:success': [];
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const {
  httpError,
  register,
} = useRegistration();

const {
  showUntil,
} = usePageLoadingIndicator();

const form = ref<RegistrationRequestDto>({
  ...DEFAULT_REGISTRATION,
});

const rules = computed<ValidationArgs>(() => {
  return {};
});

const validation = useVuelidate<RegistrationRequestDto>(rules, form);

async function onRegistration(): Promise<void> {
  await showUntil(register(form.value));

  if (!httpError.value) {
    visible.value = false;
    emit('registration:success');
  }
}
</script>

<template>
  <AppModal
    v-model:visible="visible"
    size="s"
    title="Регистрация"
  >
    <template #footer="{ close }">
      <AppModalActions layout="column">
        <AppButton
          rounded
          size="l"
          theme="blue-dark"
          :disabled="validation.$invalid"
          @click="onRegistration"
        >
          Зарегистрироваться
        </AppButton>

        <AppButton
          rounded
          size="l"
          theme="gray-lite"
          @click="close"
        >
          Отмена
        </AppButton>
      </AppModalActions>
    </template>
  </AppModal>
</template>

<style lang="scss">
.container {
  // styles
}
</style>

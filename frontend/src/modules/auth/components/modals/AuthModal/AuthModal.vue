<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';
import {
  type ValidationArgs,
  useVuelidate,
} from '@vuelidate/core';
import type { SignInRequestDto } from '../../../types';
import { useAuth } from '../../../';
import {
  AppButton,
  AppInput,
  AppModal,
  AppModalActions,
} from '@/common/components';
import {
  email,
  required,
} from '@/common/validators';
import { UnknownHttpErrorModal } from '@/modules/http';

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const {
  isError,
  signIn,
} = useAuth();

const form = ref<SignInRequestDto>({
  email: '',
  password: '',
});

const rules = computed<ValidationArgs>(() => {
  return {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  };
});

const validation = useVuelidate<SignInRequestDto>(rules, form);

async function onAuth(): Promise<void> {
  await signIn(form.value);
}

watch(visible, () => {
  form.value.email = '';
  form.value.password = '';
});
</script>

<template>
  <AppModal
    v-model:visible="visible"
    size="xs"
    title="Авторизация"
  >
    <AppInput
      v-model:value="form.email"
      class="margin-bottom--xsm"
      placeholder="Введите почту"
      label="Почта"
      :validation="validation.email"
      required
    />
    <AppInput
      v-model:value="form.password"
      class="margin-bottom--xsm"
      type="password"
      placeholder="Введите пароль"
      label="Пароль"
      :validation="validation.password"
      required
    />
    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          rounded
          size="l"
          theme="blue-dark"
          :disabled="validation.$invalid"
          @click="onAuth"
        >
          Войти
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

  <UnknownHttpErrorModal
    v-model:visible="isError"
  />
</template>

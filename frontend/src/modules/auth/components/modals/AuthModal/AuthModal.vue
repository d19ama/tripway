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
import {
  AppButton,
  AppInput,
  AppLink,
  AppModal,
  AppModalActions,
  validators,
} from '@d19ama/common';
import type { LoginRequestDto } from '../../../types';
import { useAuth } from '../../../';
import { UnknownHttpErrorModal } from '@/modules/http';
import { usePageLoadingIndicator } from '@/common/composables';
import type { UserEntity } from '@/modules/users';

interface Emits {
  'open:registration-modal': [];
  'auth:success': [email: UserEntity['email']];
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const {
  email,
  required,
} = validators;

const {
  httpError,
  login,
} = useAuth();

const {
  showUntil,
} = usePageLoadingIndicator();

const form = ref<LoginRequestDto>({
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

const validation = useVuelidate<LoginRequestDto>(rules, form);

async function onAuth(): Promise<void> {
  await showUntil(login(form.value));

  if (!httpError.value) {
    visible.value = false;
    emit('auth:success', form.value.email);
  }
}

function onRegistration(): void {
  visible.value = false;
  emit('open:registration-modal');
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
    title="Вход"
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
    <div class="auth-modal__options">
      <AppLink
        @click.prevent="onRegistration"
      >
        Регистрация
      </AppLink>
    </div>
    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          size="l"
          theme="primary"
          :disabled="validation.$invalid"
          @click="onAuth"
        >
          Войти
        </AppButton>

        <AppButton
          size="l"
          theme="unaccented"
          @click="close"
        >
          Отмена
        </AppButton>
      </AppModalActions>
    </template>
  </AppModal>

  <UnknownHttpErrorModal
    v-model:visible="httpError"
  />
</template>

<style lang="scss">
.auth-modal {

  &__options {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    gap: .5rem;
  }
}
</style>

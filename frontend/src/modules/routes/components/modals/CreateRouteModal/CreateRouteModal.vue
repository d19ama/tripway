<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  type ValidationArgs,
  useVuelidate,
} from '@vuelidate/core';
import {
  AppButton,
  AppInput,
  AppModal,
  AppModalActions,
} from '@/common/components';
import {
  type Route,
  useRoutes,
} from '@/modules/routes';
import {
  maxLength,
  minLength,
  required,
} from '@/common/validators';
import { DASH_SYMBOL } from '@/common/constants';
import { usePageLoadingIndicator } from '@/common/composables';
import { UnknownHttpErrorModal } from '@/modules/http';

interface Emits {
  'create:route:success': [id: Route['id']];
}

const emit = defineEmits<Emits>();

const {
  isError,
  createRoute,
} = useRoutes();

const {
  showUntil,
} = usePageLoadingIndicator();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const form = ref<Pick<Route, 'name'>>({
  name: '',
});

const hint = computed<string>(() => {
  return `Прим. Евро ${DASH_SYMBOL} тур ${new Date().getFullYear()}`;
});

const rules = computed<ValidationArgs>(() => {
  return {
    name: {
      required,
      maxLength: maxLength(100),
      minLength: minLength(3),
    },
  };
});

const validation = useVuelidate<Pick<Route, 'name'>>(rules, form);

async function onCreate(): Promise<void> {
  visible.value = false;

  const id: Route['id'] | undefined = await showUntil(createRoute(form.value.name));

  if (!isError.value && id) {
    emit('create:route:success', id);
  }
}
</script>

<template>
  <AppModal
    v-model:visible="visible"
    title="Создать маршрут"
  >
    <p class="margin-bottom--xs">
      Укажите название нового маршрута
    </p>
    <AppInput
      v-model:value="form.name"
      label="Название маршрута"
      placeholder="Введите название"
      :hint="hint"
      :validation="validation.name"
      required
    />

    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          rounded
          size="l"
          theme="blue-dark"
          :disabled="validation.$invalid"
          @click="onCreate"
        >
          Создать
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

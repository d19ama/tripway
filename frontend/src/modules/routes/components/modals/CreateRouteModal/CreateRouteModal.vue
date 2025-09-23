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
  AppModal,
  AppModalActions,
  validators,
} from '@d19ama/common';
import {
  type RouteEntity,
  useRoutes,
} from '@/modules/routes';
import { DASH_SYMBOL } from '@/common/constants';
import { usePageLoadingIndicator } from '@/common/composables';
import { UnknownHttpErrorModal } from '@/modules/http';

interface Emits {
  'create:route:success': [id: RouteEntity['id']];
}

const emit = defineEmits<Emits>();

const {
  maxLength,
  minLength,
  required,
} = validators;

const {
  httpError,
  createRoute,
} = useRoutes();

const {
  showUntil,
} = usePageLoadingIndicator();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const form = ref<Pick<RouteEntity, 'name'>>({
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

const validation = useVuelidate<Pick<RouteEntity, 'name'>>(rules, form);

async function onCreate(): Promise<void> {
  visible.value = false;

  const id: RouteEntity['id'] | undefined = await showUntil(createRoute(form.value.name));

  if (!httpError.value && id) {
    emit('create:route:success', id);
  }
}

watch(visible, () => {
  form.value.name = '';
});
</script>

<template>
  <AppModal
    v-model:visible="visible"
    title="Создать новое путешествие!"
  >
    <p class="margin-bottom--xs">
      Укажите название нового путешествия :)
    </p>
    <AppInput
      v-model:value="form.name"
      label="Название путешествия"
      placeholder="Введите название"
      :hint="hint"
      :validation="validation.name"
      required
    />

    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          size="l"
          theme="primary"
          :disabled="validation.$invalid"
          @click="onCreate"
        >
          Создать
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

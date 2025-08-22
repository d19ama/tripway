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
} from '@/common/components';
import {
  type RouteEntity,
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

interface Props {
  routeId: RouteEntity['id'];
  routeName: RouteEntity['name'];
}

interface Emits {
  'update:route:success': [];
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const {
  isError,
  updateRoute,
} = useRoutes();

const {
  showUntil,
} = usePageLoadingIndicator();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const form = ref<Pick<RouteEntity, 'name'>>({
  name: props.routeName,
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

async function onEdit(): Promise<void> {
  visible.value = false;

  await showUntil(updateRoute(props.routeId, {
    name: form.value.name,
  }));

  if (!isError.value) {
    emit('update:route:success');
  }
}

watch(() => props.routeName, (value) => {
  form.value.name = value;
});

watch(visible, () => {
  form.value.name = props.routeName;
});
</script>

<template>
  <AppModal
    v-model:visible="visible"
    title="Редактировать маршрут"
  >
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
          @click="onEdit"
        >
          Сохранить
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

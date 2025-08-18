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
import { useRoutes } from '@/modules/routes';
import {
  maxLength,
  minLength,
  required,
} from '@/common/validators';
import { DASH_SYMBOL } from '@/common/constants';

const {
  addRoute,
} = useRoutes();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const name = ref<string>('');

const rules = computed<ValidationArgs>(() => {
  return {
    required,
    maxLength: maxLength(100),
    minLength: minLength(3),
  };
});

const validation = useVuelidate<string>(rules, name);

function onCreate(): void {
  visible.value = false;
  addRoute(name.value);
}
</script>

<template>
  <AppModal
    v-model:visible="visible"
    title="Создать маршрут"
  >
    <p class="margin-bottom--xs">
      Укажите название нового маршрута, прим. <span class="text-italic text-color-red">{{ `Евро ${DASH_SYMBOL} тур ${new Date().getFullYear()}` }}</span>
    </p>
    <AppInput
      v-model:value="name"
      label="Название маршрута"
      placeholder="Введите название"
      required
    />

    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          theme="blue-dark"
          rounded
          size="m"
          :disabled="validation.$invalid"
          @click="onCreate"
        >
          Создать
        </AppButton>

        <AppButton
          rounded
          size="m"
          @click="close"
        >
          Отмена
        </AppButton>
      </AppModalActions>
    </template>
  </AppModal>
</template>

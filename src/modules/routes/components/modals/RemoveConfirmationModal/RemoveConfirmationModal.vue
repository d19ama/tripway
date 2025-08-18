<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  AppButton,
  AppModal,
  AppModalActions,
} from '@/common/components';
import { useRoutes } from '@/modules/routes';

const {
  removeRoute,
} = useRoutes();

const route = useRoute();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

function closeModal(): void {
  removeRoute(String(route.params.id));
  visible.value = false;
}
</script>

<template>
  <AppModal
    v-model:visible="visible"
    size="s"
    title="Удалить маршрут"
  >
    Вы уверены что хотите удалить маршрут?

    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          rounded
          size="l"
          theme="blue-dark"
          @click="closeModal"
        >
          Удалить
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

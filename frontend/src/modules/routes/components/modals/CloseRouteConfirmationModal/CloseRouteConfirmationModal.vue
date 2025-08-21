<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  AppButton,
  AppModal,
  AppModalActions,
} from '@/common/components';
import { useRoutes } from '@/modules/routes';

const {
  closeRoute,
} = useRoutes();

const route = useRoute();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

function closeModal(): void {
  closeRoute(String(route.params.id));
  visible.value = false;
}
</script>

<template>
  <AppModal
    v-model:visible="visible"
    size="s"
    title="Закрыть маршрут"
  >
    Вы уверены что хотите закрыть маршрут? Все имзенения будут утеряны!

    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          rounded
          size="l"
          theme="blue-dark"
          @click="closeModal"
        >
          Закрыть
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

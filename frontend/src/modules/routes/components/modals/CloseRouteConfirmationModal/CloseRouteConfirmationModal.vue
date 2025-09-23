<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  AppButton,
  AppModal,
  AppModalActions,
} from '@d19ama/common';
import { useNavigation } from '@/modules/navigation';

const {
  closeRoute,
} = useNavigation();

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
          size="l"
          theme="primary"
          @click="closeModal"
        >
          Закрыть
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
</template>

<script setup lang="ts">
import {
  AppButton,
  AppModal,
  AppModalActions,
} from '@/common/components';
import {
  type Route,
  useRoutes,
} from '@/modules/routes';

interface Props {
  routeId: Route['id'];
}

const props = defineProps<Props>();

const {
  deleteRoute,
} = useRoutes();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

function closeModal(): void {
  deleteRoute(props.routeId);
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

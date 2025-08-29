<script setup lang="ts">
import {
  AppButton,
  AppModal,
  AppModalActions,
} from '@/common/components';
import {
  type RouteEntity,
  useRoutes,
} from '@/modules/routes';
import { usePageLoadingIndicator } from '@/common/composables';
import { UnknownHttpErrorModal } from '@/modules/http';

interface Props {
  routeId: RouteEntity['id'];
}

interface Emits {
  'delete:route:success': [];
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const {
  httpError,
  deleteRoute,
} = useRoutes();

const {
  showUntil,
} = usePageLoadingIndicator();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

async function closeModal(): Promise<void> {
  visible.value = false;
  await showUntil(deleteRoute(props.routeId));

  if (!httpError.value) {
    emit('delete:route:success');
  }
}
</script>

<template>
  <AppModal
    v-model:visible="visible"
    size="s"
    title="Удалить путешествие"
  >
    Вы уверены что хотите удалить путешествие?

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

  <UnknownHttpErrorModal
    v-model:visible="httpError"
  />
</template>

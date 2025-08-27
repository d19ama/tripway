<script setup lang="ts">
import {
  AppButton,
  AppModal,
  AppModalActions,
} from '@/common/components';

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});
</script>

<template>
  <AppModal
    v-model:visible="visible"
    size="s"
    title="Ой! Что-то пошло не так!"
  >
    <template #default>
      Сервис временно недоступен, попробуйте позже. Приносим свои извинения за&nbsp;предоставленные неудобства!
    </template>

    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          rounded
          size="l"
          theme="blue-dark"
          @click="close"
        >
          Понятно
        </AppButton>
      </AppModalActions>
    </template>
  </AppModal>
</template>

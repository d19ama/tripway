<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  type ValidationArgs,
  useVuelidate,
} from '@vuelidate/core';
import type {
  Route,
  RouteSection,
  RouteSectionTransportType,
} from '../../../types';
import { useRoutes } from '../../../composables';
import {
  AppButton,
  AppDatePicker,
  AppInput,
  AppModal,
  AppModalActions,
  AppSelect,
  type AppSelectOption,
  AppTitle,
} from '@/common/components';

import {
  DEFAULT_ROUTE_SECTION,
  ROUTE_SECTION_TRANSPORT_TYPE_MAP,
} from '@/modules/routes/constants';

interface Props {
  routeId?: Route['id'];
}

const props = defineProps<Props>();

const {
  addRouteSection,
} = useRoutes();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const form = ref<RouteSection>({
  ...DEFAULT_ROUTE_SECTION,
});

const options = ref<AppSelectOption<RouteSectionTransportType>[]>([
  {
    id: 'airplane',
    text: ROUTE_SECTION_TRANSPORT_TYPE_MAP.airplane,
    selected: false,
    disabled: false,
  },
  {
    id: 'bus',
    text: ROUTE_SECTION_TRANSPORT_TYPE_MAP.bus,
    selected: false,
    disabled: false,
  },
  {
    id: 'bicycle',
    text: ROUTE_SECTION_TRANSPORT_TYPE_MAP.bicycle,
    selected: false,
    disabled: false,
  },
  {
    id: 'other',
    text: ROUTE_SECTION_TRANSPORT_TYPE_MAP.other,
    selected: false,
    disabled: false,
  },
  {
    id: 'train',
    text: ROUTE_SECTION_TRANSPORT_TYPE_MAP.train,
    selected: false,
    disabled: false,
  },
]);

const rules = computed<ValidationArgs>(() => {
  return {
    transport: {},
    location: {},
  };
});

const validation = useVuelidate<RouteSection>(rules, form);

function onAdd(): void {
  visible.value = false;

  if (props.routeId) {
    addRouteSection(props.routeId, form.value);
  }
}
</script>

<template>
  <AppModal
    v-model:visible="visible"
    size="m"
    title="Создать точку маршрута"
  >
    <div class="row">
      <div class="col-default-12">
        <AppTitle tag="h5">
          Локация
        </AppTitle>
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.location.country"
          label="Страна назначения"
          placeholder="Введите страну назначения"
          required
        />
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.location.city"
          label="Город назначения"
          placeholder="Введите город назначения"
          required
        />
      </div>
    </div>

    <div class="row">
      <div class="col-default-12">
        <AppTitle tag="h5">
          Транспорт
        </AppTitle>
      </div>
      <div class="col-default-6">
        <AppDatePicker
          v-model:date="form.transport.departure"
          label="Дата отправления"
          placeholder="Выберите дату отправления"
          required
        />
      </div>
      <div class="col-default-6">
        <AppDatePicker
          v-model:date="form.transport.arrival"
          label="Дата прибытия"
          placeholder="Выберите дату прибытия"
          required
        />
      </div>
      <div class="col-default-12">
        <AppSelect
          v-model:selected="form.transport.type"
          :options="options"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-default-12">
        <AppTitle tag="h5">
          Проживание
        </AppTitle>
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.habitation.address"
          label="Город назначения"
          placeholder="Введите город назначения"
          required
        />
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.habitation.price"
          label="Город назначения"
          placeholder="Введите город назначения"
          required
        />
      </div>
    </div>

    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          theme="blue-dark"
          rounded
          size="m"
          :disabled="validation.$invalid"
          @click="onAdd"
        >
          Добавить
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

<style lang="scss">
.add-route-section-modal {}
</style>

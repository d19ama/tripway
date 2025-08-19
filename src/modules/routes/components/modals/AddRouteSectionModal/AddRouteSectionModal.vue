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
  AppDivider,
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
import {
  maxLength,
  minLength,
  required,
} from '@/common/validators';

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
    transport: {
      departure: {
        required,
      },
      arrival: {
        required,
      },
    },
    location: {
      city: {
        required,
        maxLength: maxLength(100),
        minLength: minLength(2),
      },
      country: {
        required,
        maxLength: maxLength(100),
        minLength: minLength(3),
      },
    },
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
        <AppTitle tag="h6">
          Локация
        </AppTitle>
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.location.country"
          label="Страна"
          placeholder="Введите страну назначения"
          :validation="validation.location.country"
          required
        />
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.location.city"
          label="Город"
          placeholder="Введите город назначения"
          :validation="validation.location.city"
          required
        />
      </div>
    </div>

    <AppDivider class="margin-top--xsm margin-bottom--xsm" />

    <div class="row">
      <div class="col-default-12">
        <AppTitle tag="h6">
          Транспорт
        </AppTitle>
      </div>
      <div class="col-default-6">
        <AppDatePicker
          v-model:date="form.transport.departure"
          label="Дата отправления"
          placeholder="Выберите дату отправления"
          :validation="validation.transport.departure"
          required
        />
      </div>
      <div class="col-default-6">
        <AppDatePicker
          v-model:date="form.transport.arrival"
          label="Дата прибытия"
          placeholder="Выберите дату прибытия"
          :validation="validation.transport.arrival"
          required
        />
      </div>
      <div class="col-default-6">
        <AppSelect
          v-model:selected="form.transport.type"
          :options="options"
          label="Вид транспорта"
          placeholder="Выберите вид транспорта"
        />
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.transport.price"
          label="Цена проживания"
          placeholder="Введите цену"
        />
      </div>
    </div>

    <AppDivider class="margin-top--xsm margin-bottom--xsm" />

    <div class="row">
      <div class="col-default-12">
        <AppTitle tag="h6">
          Проживание
        </AppTitle>
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.habitation.address"
          label="Адрес проживания"
          placeholder="Введите адрес"
        />
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value="form.habitation.price"
          label="Цена проживания"
          placeholder="Введите цену"
        />
      </div>
    </div>

    <AppDivider class="margin-top--xsm margin-bottom--xsm" />

    <template #footer="{ close }">
      <AppModalActions>
        <AppButton
          rounded
          size="l"
          theme="blue-dark"
          :disabled="validation.$invalid"
          @click="onAdd"
        >
          Добавить
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

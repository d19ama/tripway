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
import { useRouteSection } from '../../../composables';
import {
  DEFAULT_ROUTE_SECTION,
  ROUTE_SECTION_TRANSPORT_TYPE_MAP,
} from '../../../constants';
import type {
  RouteSectionEntity,
  TransportType,
} from '../../../types';
import type { RouteEntity } from '@/modules/routes';
import {
  AppButton,
  AppCheckbox,
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
  maxLength,
  minLength,
  required,
} from '@/common/validators';
import { dayjs } from '@/app/plugins/dayjs';
import type { AppInputMaskParams } from '@/common/components/AppInput/types';

interface Props {
  routeId: RouteEntity['id'];
}

interface Emits {
  'create:route-section:success': [];
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const COST_MASK: AppInputMaskParams = {
  mask: Number,
  min: 0,
  scale: 0,
  thousandsSeparator: ' ',
};

const {
  httpError,
  createRouteSection,
} = useRouteSection();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const form = ref<RouteSectionEntity>({
  ...DEFAULT_ROUTE_SECTION,
});

const isMovingCostUnknown = ref<boolean>(false);
const isStayingCostUnknown = ref<boolean>(false);

const transportTypeOptions = ref<AppSelectOption<TransportType>[]>([
  {
    id: 'airplane',
    text: ROUTE_SECTION_TRANSPORT_TYPE_MAP.airplane,
    selected: false,
    disabled: false,
  },
  {
    id: 'train',
    text: ROUTE_SECTION_TRANSPORT_TYPE_MAP.train,
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
    id: 'car',
    text: ROUTE_SECTION_TRANSPORT_TYPE_MAP.car,
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
]);

const rules = computed<ValidationArgs>(() => {
  return {
    departure: {
      required,
    },
    arrival: {
      required,
    },
    destinationCity: {
      required,
      maxLength: maxLength(100),
      minLength: minLength(2),
    },
    destinationCountry: {
      required,
      maxLength: maxLength(100),
      minLength: minLength(3),
    },
  };
});

const validation = useVuelidate<RouteSectionEntity>(rules, form);

const minDepartureDate = computed<string>(() => {
  return dayjs().format();
});

const minArrivalDate = computed<string>(() => {
  return form.value.departure.length > 0
    ? form.value.departure
    : '';
});

async function onCreate(): Promise<void> {
  visible.value = false;

  await createRouteSection(props.routeId, form.value);

  if (!httpError.value) {
    emit('create:route-section:success');
  }
}

watch(visible, () => {
  form.value = {
    ...DEFAULT_ROUTE_SECTION,
  };
});
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
          v-model:value.trim="form.destinationCountry"
          label="Страна"
          placeholder="Введите страну назначения"
          hint="Прим. Великобритания"
          :validation="validation.destinationCountry"
          required
        />
      </div>
      <div class="col-default-6">
        <AppInput
          v-model:value.trim="form.destinationCity"
          label="Город"
          placeholder="Введите город назначения"
          hint="Прим. Лондон"
          :validation="validation.destinationCity"
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
          v-model:date="form.departure"
          label="Дата отправления"
          placeholder="Выберите дату отправления"
          :validation="validation.departure"
          :min-date="minDepartureDate"
          required
        />
      </div>
      <div class="col-default-6">
        <AppDatePicker
          v-model:date="form.arrival"
          label="Дата прибытия"
          placeholder="Выберите дату прибытия"
          :validation="validation.arrival"
          :min-date="minArrivalDate"
          required
        />
      </div>
      <div class="col-default-6">
        <AppSelect
          v-model:value="form.transportType"
          :options="transportTypeOptions"
          label="Вид транспорта"
          placeholder="Выберите вид транспорта"
        />
      </div>
      <div class="col-default-3">
        <AppInput
          v-model:value.trim="form.movingCost"
          :disabled="isMovingCostUnknown"
          label="Дорога, ₽"
          placeholder="Сумма"
          :mask="COST_MASK"
        />
      </div>
      <div class="col-default-3">
        <AppCheckbox
          v-model:checked="isMovingCostUnknown"
          text="Пока не знаю"
          class="margin-top--s"
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
          v-model:value.trim="form.stayingPlace"
          label="Адрес проживания"
          placeholder="Введите адрес"
          hint="Прим. Отель 'Будапешт'"
        />
      </div>
      <div class="col-default-3">
        <AppInput
          v-model:value.trim="form.stayingCost"
          :disabled="isStayingCostUnknown"
          label="Проживание, ₽"
          placeholder="Сумма"
        />
      </div>
      <div class="col-default-3">
        <AppCheckbox
          v-model:checked="isStayingCostUnknown"
          text="Пока не знаю"
          class="margin-top--s"
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
          @click="onCreate"
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

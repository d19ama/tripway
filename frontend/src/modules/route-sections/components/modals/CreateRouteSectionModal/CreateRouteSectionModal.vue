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
  ROUTE_SECTION_TRANSPORT_TYPE_OPTIONS,
} from '../../../constants';
import type {
  RouteSectionEntity,
  TransportType,
} from '../../../types';
import type { RouteEntity } from '@/modules/routes';
import {
  AppButton,
  AppCheckbox,
  AppCombobox,
  type AppComboboxOption,
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
import {
  dayjs,
  maskNumber,
} from '@/app/plugins';
import { useGeo } from '@/modules/geo';

interface Props {
  routeId: RouteEntity['id'];
}

interface Emits {
  'create:route-section:success': [];
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const {
  httpError,
  createRouteSection,
} = useRouteSection();

const {
  httpError: geoHttpError,
  httpLoading,
  cities,
  countries,
  getCity,
  getCountry,
} = useGeo();

const visible = defineModel<boolean>('visible', {
  required: false,
  default: false,
});

const city = ref<string>('');
const country = ref<string>('');
const isMovingCostUnknown = ref<boolean>(false);
const isStayingCostUnknown = ref<boolean>(false);

const form = ref<RouteSectionEntity>({
  ...DEFAULT_ROUTE_SECTION,
});

const transportTypeOptions = ref<AppSelectOption<TransportType>[]>([
  ...ROUTE_SECTION_TRANSPORT_TYPE_OPTIONS,
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
      minLength: minLength(2),
    },
    transportType: {
      required,
    },
  };
});

const validation = useVuelidate<RouteSectionEntity>(rules, form);

const citiesOptions = computed<AppComboboxOption[]>(() => {
  return cities.value.map((item) => {
    return {
      id: item.place_id,
      text: item.name,
      selected: false,
      disabled: false,
    };
  });
});

const countriesOptions = computed<AppComboboxOption[]>(() => {
  return countries.value.map((item) => {
    return {
      id: item.place_id,
      text: item.name,
      selected: false,
      disabled: false,
    };
  });
});

const minDepartureDate = computed<string>(() => {
  return dayjs().format();
});

const minArrivalDate = computed<string>(() => {
  return form.value.departure.length > 0
    ? form.value.departure
    : '';
});

const coordinates = computed<Pick<RouteSectionEntity, 'latitude' | 'longitude'>>(() => {
  const city = cities.value.find((item) => {
    return item.name === form.value.destinationCity;
  });

  if (!city) {
    return {
      latitude: '',
      longitude: '',
    };
  }

  return {
    latitude: city.lat,
    longitude: city.lon,
  };
});

async function onCreate(): Promise<void> {
  visible.value = false;

  await createRouteSection(props.routeId, {
    ...form.value,
    ...coordinates.value,
  });

  if (!httpError.value) {
    emit('create:route-section:success');
  }
}

watch(visible, () => {
  form.value = {
    ...DEFAULT_ROUTE_SECTION,
  };
});

watch(country, async (country) => {
  await getCountry(country);
});

watch(city, async (city) => {
  await getCity(city, country.value);
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
        <AppCombobox
          v-model:value="form.destinationCountry"
          v-model:search="country"
          :loading="httpLoading"
          :search-error="geoHttpError"
          :options="countriesOptions"
          :validation="validation.destinationCountry"
          label="Страна"
          placeholder="Введите страну назначения"
          hint="Прим. Великобритания"
          required
        />
      </div>
      <div class="col-default-6">
        <AppCombobox
          v-model:value="form.destinationCity"
          v-model:search="city"
          :loading="httpLoading"
          :search-error="geoHttpError"
          :disabled="!form.destinationCountry"
          :options="citiesOptions"
          :validation="validation.destinationCity"
          label="Город"
          placeholder="Введите город назначения"
          hint="Прим. Лондон"
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
          required
        />
      </div>
      <div class="col-default-3">
        <AppInput
          v-model:value.trim="form.movingCost"
          :disabled="isMovingCostUnknown"
          label="Дорога, ₽"
          placeholder="Сумма"
          :mask="maskNumber"
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

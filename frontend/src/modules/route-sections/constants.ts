import type { AppSelectOption } from '@d19ama/common';
import type {
  RouteSectionEntity,
  TransportType,
} from '@/modules/route-sections/types';

export const DEFAULT_ROUTE_SECTION: RouteSectionEntity = {
  arrival: '',
  createdAt: '',
  departure: '',
  destinationCity: '',
  destinationCountry: '',
  id: '',
  movingCost: '',
  routeId: '',
  stayingCost: '',
  stayingPlace: '',
  transportType: undefined,
  updatedAt: '',
  position: 0,
  latitude: '',
  longitude: '',
};

export const ROUTE_SECTION_TRANSPORT_TYPE_MAP: Record<TransportType, string> = {
  airplane: 'Самолет',
  bicycle: 'Велосипед',
  bus: 'Автобус',
  car: 'Автомобиль',
  other: 'Другое',
  train: 'Поезд',
};

export const ROUTE_SECTION_TRANSPORT_TYPE_OPTIONS: AppSelectOption<TransportType>[] = [
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
];

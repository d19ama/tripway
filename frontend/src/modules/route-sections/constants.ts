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

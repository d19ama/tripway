import type {
  Route,
  RouteSection,
  RouteSectionTransportType,
} from './types';

export const DEFAULT_ROUTE: Route = {
  id: '',
  name: '',
  status: 'new',
  opened: false,
  active: false,
  costs: 0,
  date: [],
  route: [],
};

export const DEFAULT_ROUTE_SECTION: RouteSection = {
  id: '',
  location: {
    city: '',
    country: '',
  },
  transport: {
    departure: '',
    arrival: '',
    type: 'other',
  },
  habitation: {},
};

export const ROUTE_SECTION_TRANSPORT_TYPE_MAP: Record<RouteSectionTransportType, string> = {
  airplane: 'Самолет',
  bicycle: 'Велосипед',
  bus: 'Автобус',
  car: 'Автомобиль',
  other: 'Другое',
  train: 'Поезд',
};

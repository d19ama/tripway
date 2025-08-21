import type {
  Route,
  RouteSection,
  RouteSectionTransportType,
} from './types';

export const DEFAULT_ROUTE: Route = {
  id: '',
  name: '',
  state: 'new',
  opened: false,
  active: false,
  costs: 0,
  startDate: '',
  endDate: '',
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

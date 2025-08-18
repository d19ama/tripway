import type {
  Route,
  RouteSection,
} from '@/modules/routes/types';

export const MOCKED_ROUTE: RouteSection[] = [
  {
    id: '1',
    transport: {
      departure: '2018-08-24',
      arrival: '2018-08-25',
      type: 'airplane',
    },
    location: {
      city: 'Хельсинки',
      country: 'Финляндия',
    },
    habitation: {},
  },
  {
    id: '2',
    transport: {
      departure: '2018-08-25',
      arrival: '2018-08-25',
      type: 'airplane',
    },
    location: {
      city: 'Римини',
      country: 'Италия',
    },
    habitation: {},
  },
  {
    id: '3',
    transport: {
      departure: '2018-08-31',
      arrival: '2018-08-31',
      type: 'train',
    },
    location: {
      city: 'Венеция',
      country: 'Италия',
    },
    habitation: {},
  },
  {
    id: '4',
    transport: {
      departure: '2018-09-01',
      arrival: '2018-09-01',
      type: 'airplane',
    },
    location: {
      city: 'Амстердам',
      country: 'Нидерланды',
    },
    habitation: {},
  },
  {
    id: '5',
    transport: {
      departure: '2018-09-05',
      arrival: '2018-09-05',
      type: 'bus',
    },
    location: {
      city: 'Брюгге',
      country: 'Бельгия',
    },
    habitation: {},
  },
  {
    id: '6',
    transport: {
      departure: '2018-09-07',
      arrival: '2018-09-07',
      type: 'bus',
    },
    location: {
      city: 'Брюссель',
      country: 'Бельгия',
    },
    habitation: {},
  },
  {
    id: '7',
    transport: {
      departure: '2018-09-08',
      arrival: '2018-09-08',
      type: 'airplane',
    },
    location: {
      city: 'Рига',
      country: 'Латвия',
    },
    habitation: {},
  },
  {
    id: '8',
    transport: {
      departure: '2018-09-09',
      arrival: '2018-09-09',
      type: 'airplane',
    },
    location: {
      city: 'Санкт-Петербург',
      country: 'Россия',
    },
    habitation: {},
  },
];

export const MOCKED_ROUTES: Route[] = [
  {
    id: 'first',
    status: 'completed',
    name: 'First route',
    opened: false,
    active: false,
    costs: 200000,
    date: [
      '2025-06-12',
      '2025-07-12',
    ],
    route: [
      ...MOCKED_ROUTE,
    ],
  },
  {
    id: 'second',
    status: 'edit',
    name: 'Second route',
    opened: false,
    active: false,
    costs: 250000,
    date: [
      '2025-08-03',
      '2025-09-05',
    ],
    route: [],
  },
];

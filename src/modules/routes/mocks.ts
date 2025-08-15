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
      from: {
        city: 'Санкт-Петербург',
        country: 'Россия',
      },
      to: {
        city: 'Хельсинки',
        country: 'Финляндия',
      },
    },
  },
  {
    id: '2',
    transport: {
      departure: '2018-08-25',
      arrival: '2018-08-25',
      type: 'airplane',
    },
    location: {
      from: {
        city: 'Хельсинки',
        country: 'Финляндия',
      },
      to: {
        city: 'Римини',
        country: 'Италия',
      },
    },
  },
  {
    id: '3',
    transport: {
      departure: '2018-08-31',
      arrival: '2018-08-31',
      type: 'train',
    },
    location: {
      from: {
        city: 'Римини',
        country: 'Италия',
      },
      to: {
        city: 'Венеция',
        country: 'Италия',
      },
    },
  },
  {
    id: '4',
    transport: {
      departure: '2018-09-01',
      arrival: '2018-09-01',
      type: 'airplane',
    },
    location: {
      from: {
        city: 'Венеция',
        country: 'Италия',
      },
      to: {
        city: 'Амстердам',
        country: 'Нидерланды',
      },
    },
  },
  {
    id: '5',
    transport: {
      departure: '2018-09-05',
      arrival: '2018-09-05',
      type: 'bus',
    },
    location: {
      from: {
        city: 'Амстердам',
        country: 'Нидерланды',
      },
      to: {
        city: 'Брюгге',
        country: 'Бельгия',
      },
    },
  },
  {
    id: '6',
    transport: {
      departure: '2018-09-07',
      arrival: '2018-09-07',
      type: 'bus',
    },
    location: {
      from: {
        city: 'Брюгге',
        country: 'Бельгия',
      },
      to: {
        city: 'Брюссель',
        country: 'Бельгия',
      },
    },
  },
  {
    id: '7',
    transport: {
      departure: '2018-09-08',
      arrival: '2018-09-08',
      type: 'airplane',
    },
    location: {
      from: {
        city: 'Брюссель',
        country: 'Бельгия',
      },
      to: {
        city: 'Рига',
        country: 'Латвия',
      },
    },
  },
  {
    id: '8',
    transport: {
      departure: '2018-09-09',
      arrival: '2018-09-09',
      type: 'airplane',
    },
    location: {
      from: {
        city: 'Рига',
        country: 'Латвия',
      },
      to: {
        city: 'Санкт-Петербург',
        country: 'Россия',
      },
    },
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

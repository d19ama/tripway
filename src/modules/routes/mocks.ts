import type {
  Route,
  RouteSection,
} from '@/modules/routes/types';

export const MOCKED_ROUTE: RouteSection[] = [
  {
    id: '1',
    transport: {
      departure: '24.08/23:30',
      arrival: '25.08/07:50',
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
      departure: '25.08/18:00',
      arrival: '25.08/20:00',
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
      departure: '31.08/07:40',
      arrival: '31.08/12:35',
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
      departure: '01.09/20:35',
      arrival: '01.09/22:35',
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
      departure: '05.09/08:00',
      arrival: '05.09/13:45',
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
      departure: '07.09/14:20',
      arrival: '07.09/16:20',
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
      departure: '08.09/09:40',
      arrival: '08.09/13:05',
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
      departure: '09.09/12:00',
      arrival: '09.09/13:20',
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
    name: 'First route',
    opened: false,
    active: false,
    costs: 200000,
    date: [
      1625153594,
      1625153594,
    ],
    route: {
      ...MOCKED_ROUTE,
    },
  },
  {
    id: 'second',
    name: 'Second route',
    opened: false,
    active: false,
    costs: 250000,
    date: [
      1625153594,
      1625153594,
    ],
    route: {
      ...MOCKED_ROUTE,
    },
  },
];

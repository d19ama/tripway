import { RouteNames } from '@/app/router/route-names';

interface Navigation {
  label: string;
  routeName: RouteNames;
}

export const navigation: Navigation[] = [
  {
    label: 'Главная',
    routeName: RouteNames.Home,
  },
  {
    label: 'Путешествия',
    routeName: RouteNames.Routes,
  },
];

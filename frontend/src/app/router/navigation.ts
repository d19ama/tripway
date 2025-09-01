import { RouteNames } from '@/app/router/route-names';

interface Navigation {
  label: string;
  routeName: RouteNames;
}

export const navigation: Navigation[] = [
  {
    label: 'Путешествия',
    routeName: RouteNames.Routes,
  },
  {
    label: 'Профиль',
    routeName: RouteNames.Profile,
  },
];

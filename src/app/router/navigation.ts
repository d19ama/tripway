import { RouteNames } from '@/app/router/route-names';

interface Navigation {
  label: string;
  routeName: RouteNames;
}

export const navigation: Navigation[] = [
  {
    label: 'home',
    routeName: RouteNames.Home,
  },
  {
    label: 'routes',
    routeName: RouteNames.Routes,
  },
];

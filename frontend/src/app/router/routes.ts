import type { RouteRecordRaw } from 'vue-router';
import { Routes } from '../layouts';
import { isAuthenticated } from './guards';
import { RouteNames } from '@/app/router/route-names';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.Home,
    component: () => import('@/pages/index.vue'),
    meta: {
      title: 'Главная страница',
      menuLabel: 'Главная',
      auth: 'public',
    },
  },
  {
    path: '/profile',
    name: RouteNames.Profile,
    component: () => import('@/pages/profile/index.vue'),
    meta: {
      title: 'Страница профиля',
      menuLabel: 'Профиль',
      backgroundImage: false,
    },
    beforeEnter: [
      isAuthenticated(),
    ],
  },
  {
    path: '/routes',
    name: RouteNames.Routes,
    component: () => import('@/pages/routes/index.vue'),
    meta: {
      title: 'Мои путешествия',
      menuLabel: 'Мои путешествия',
      layout: Routes,
    },
    redirect: {
      name: RouteNames.RoutesList,
    },
    beforeEnter: [
      isAuthenticated(),
    ],
    children: [
      {
        path: 'list',
        name: RouteNames.RoutesList,
        component: () => import('@/pages/routes/list.vue'),
        meta: {
          title: 'Мои путешествия',
          menuLabel: 'Мои путешествия',
        },
      },
      {
        path: ':id',
        name: RouteNames.RoutePage,
        component: () => import('@/pages/routes/[id].vue'),
        meta: {
          title: 'Просмотр маршрута путешествия',
          menuLabel: 'Просмотр маршрута путешествия',
        },
      },
    ],
  },
];

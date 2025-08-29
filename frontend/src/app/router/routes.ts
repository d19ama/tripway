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
      title: 'Home',
      auth: 'public',
    },
  },
  {
    path: '/profile',
    name: RouteNames.Profile,
    component: () => import('@/pages/profile/index.vue'),
    meta: {
      title: 'Profile',
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
      title: 'Routes',
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
          title: 'Route page',
        },
      },
      {
        path: ':id',
        name: RouteNames.RoutePage,
        component: () => import('@/pages/routes/[id].vue'),
        meta: {
          title: 'Route page',
        },
      },
    ],
  },
];

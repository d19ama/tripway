import type { RouteRecordRaw } from 'vue-router';
import { RouteNames } from '@/app/router/route-names';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.Home,
    component: () => import('@/pages/index.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/routes',
    name: RouteNames.Routes,
    component: () => import('@/pages/routes.vue'),
    meta: {
      title: 'Routes',
    },
  },
];

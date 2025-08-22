import type { RouteRecordRaw } from 'vue-router';
import { Routes } from '../layouts';
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
    component: () => import('@/pages/routes/index.vue'),
    meta: {
      title: 'Routes',
      layout: Routes,
    },
    redirect: {
      name: RouteNames.RoutesList,
    },
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
        path: 'list/:id',
        name: RouteNames.RoutePage,
        components: {
          default: () => import('@/pages/routes/[id].vue'),
          actions: () => import('@/modules/route-sections/components/Actions/Actions.vue'),
        },
        meta: {
          title: 'Route page',
        },
      },
    ],
  },
];

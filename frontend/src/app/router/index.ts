import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import type { ComponentInstance } from 'vue';
import { Default } from '../layouts';
import { routes } from './routes';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    menuLabel: string;
    backgroundImage?: boolean;
    auth?: 'public' | 'private';
    layout?: ComponentInstance<any>;
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (!to.meta.layout) {
    to.meta.layout = Default;
  }

  if (to.meta.backgroundImage === undefined) {
    to.meta.backgroundImage = true;
  }

  if (to.meta.auth === undefined) {
    to.meta.auth = 'private';
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

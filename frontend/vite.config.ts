import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig((): UserConfig => {
  return {
    plugins: [vue(), VueDevTools()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      target: ['chrome98', 'edge98', 'firefox97', 'safari15'],
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/app/assets/styles/globals.scss' as *;`,
        },
      },
    },
  };
});

import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import type { UserConfig } from 'vite';
import {
  configDefaults,
  defineConfig,
} from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((env) => {
  return mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        exclude: [
          ...configDefaults.exclude,
          'e2e/*',
        ],
        root: fileURLToPath(new URL('./', import.meta.url)),
        coverage: {
          all: true,
          reporter: [
            'html-spa',
            [
              'lcovonly',
              {
                projectRoot: './src',
                file: './lcov/lcov-coverage.info',
              },
            ],
          ],
          exclude: [
            'src/generated/**',
          ],
        },
      },
    }) as UserConfig,
  );
});

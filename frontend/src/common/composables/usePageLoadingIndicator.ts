import {
  type InjectionKey,
  type Ref,
  computed,
  inject,
  ref,
  watch,
} from 'vue';

export const PAGE_LOADING_INDICATOR_INJECTION_KEY: InjectionKey<Ref<boolean>> = Symbol('PageLoadingIndicator');

// Счетчик процессов ожидающих завершения
const count = ref<number>(0);

/**
 * Composable для отображения индикатора загрузки текущей страницы - PageLoadingIndicator.vue
 */
export function usePageLoadingIndicator() {
  const state = inject(PAGE_LOADING_INDICATOR_INJECTION_KEY);

  // Прямая мутация специально запрещена!
  // Используй showUntil()
  const loading = computed<boolean>(() => state
    ? state.value
    : false);

  /**
   * Отобразить индикатор загрузки страницы, пока не будет завершен асинхронный процесс
   * @param process асинхронный процесс по завершению которого индикатор будет убран
   * @example
   * const salary = await showUntil(Promise.resolve(1000)); // salary: number;
   * const [salary, name] = await showUntil(Promise.all([Promise.resolve(1000), Promise.resolve('John Doe')]); // salary: number; name: string;
   */
  function showUntil<T extends Promise<any>>(process: T): T {
    count.value++; // Увеличиваем счетчик активных процессов
    process.finally(() => count.value--); // Уменьшаем счетчик активных процессов

    return process;
  }

  // Переключаем состояние, если есть активные процессы
  watch(count, (value) => {
    if (state) {
      state.value = value > 0;
    }
  });

  return {
    loading,
    showUntil,
  };
}

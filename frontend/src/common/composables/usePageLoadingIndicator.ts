import {
  ref,
  watch,
} from 'vue';

// Счетчик процессов ожидающих завершения
const count = ref<number>(0);
const loading = ref<boolean>(false);

export function usePageLoadingIndicator() {
  function showUntil<T extends Promise<any>>(process: T): T {
    count.value++; // Увеличиваем счетчик активных процессов
    process.finally(() => count.value--); // Уменьшаем счетчик активных процессов

    return process;
  }

  // Переключаем состояние, если есть активные процессы
  watch(count, (value) => {
    loading.value = value > 0;
  });

  return {
    loading,
    showUntil,
  };
}

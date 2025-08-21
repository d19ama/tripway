/**
 * Функция для асинхронной задержки
 * @param interval - время задержки в мс
 */
export function delay(interval: number): Promise<void> {
  return new Promise((resolve: Function) => {
    return setTimeout(resolve, interval);
  });
}

export function componentName(prefix: string = 'component'): string {
  return `${prefix}-${Math.random() * 1000}`.toLowerCase();
}

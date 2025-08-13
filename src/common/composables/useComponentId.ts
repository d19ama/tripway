import { getCurrentInstance } from 'vue';

export function useComponentId(prefix?: string): string {
  const uid = getCurrentInstance()?.uid as number;

  return prefix
    ? `${prefix}-${uid}`
    : uid.toString();
}

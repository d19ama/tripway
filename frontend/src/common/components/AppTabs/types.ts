import type { VNode } from 'vue';

export interface AppTabsItem<T extends string = string> {
  id: T;
  label?: string;
  active: boolean;
  disabled?: boolean;
  align?: 'left' | 'right';
}

export interface AppTabsSlots {
  [key: `tab-${AppTabsItem['id']}`]: (scope: { text?: string }) => VNode[];
}

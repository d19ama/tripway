import type { VNode } from 'vue';

export interface AppModalActionsProps {
  layout?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

export interface AppModalActionsSlots {
  default?: () => VNode[];
}

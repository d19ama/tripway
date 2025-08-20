import type { VNode } from 'vue';

export interface AppTransitionProps {
  name?: 'fade';
}

export interface AppTransitionSlots {
  default?: () => VNode[];
}

import type { VNode } from 'vue';
import type { AppListProps } from '../../';

export interface AppListItemProps
  extends Omit<AppListProps, 'items'> {}

export interface AppListItemSlots {
  default?: () => VNode[];
}

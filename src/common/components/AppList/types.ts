import type { VNode } from 'vue';

export type AppListTags = 'ul' | 'ol';

export interface AppListItemType {
  id: string;
  label: string;
}

export interface AppListProps {
  tag?: AppListTags;
  noMarkers?: boolean;
  items?: AppListItemType[];
}

export interface AppListSlots {
  [key: `list-item-${AppListItemType['id']}`]: (scope: {
    data: AppListItemType;
  }) => VNode[];
}

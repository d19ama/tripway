import type { VNode } from 'vue';

export type AppModalSize = 'xs' | 's' | 'm' | 'l' | 'full-width' | 'full-page';

export interface AppModalProps {
  title?: string;
  appendTo?: string;
  rounded?: boolean;
  size?: AppModalSize;
}

export interface AppModalSlots {
  header?: () => VNode[];
  default?: () => VNode[];
  footer?: (props: {
    close: () => void;
  }) => VNode[];
}

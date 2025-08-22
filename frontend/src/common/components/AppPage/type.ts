import type { VNode } from 'vue';

export interface AppPageProps {
  title?: string;
  fullWidth?: boolean;
}

export interface AppPageSlots {
  header?: () => VNode[];
  content?: () => VNode[];
  footer?: () => VNode[];
}

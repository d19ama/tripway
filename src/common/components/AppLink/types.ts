import type { VNode } from 'vue';

export type AppLinkHover = 'red';

export type AppLinkTarget = '_blank' | '_self';

export type AppLinkTheme = 'primary' | 'secondary';

export interface AppLinkProps {
  url?: string;
  text?: string;
  prevent?: boolean;
  underline?: boolean;
  hover?: AppLinkHover;
  theme?: AppLinkTheme;
  target?: AppLinkTarget;
}

export interface AppLinkEmits {
  click: [event: Event];
}

export interface AppLinkSlots {
  default?: () => VNode[];
}

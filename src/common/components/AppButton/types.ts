import type { VNode } from 'vue';
import type { RouteNames } from '@/app/router/route-names';

export type AppButtonSize = 's' | 'm' | 'l';

export type AppButtonTag = 'button' | 'a';

export type AppButtonBlank = '_blank' | '_self';

export type AppButtonTheme =
  | 'red'
  | 'green'
  | 'yellow'
  | 'icon-red'
  | 'border-red'
  | 'border-green'
  | 'border-yellow';

export interface AppButtonProps {
  href?: string;
  text?: string;
  to?: RouteNames;
  rounded?: boolean;
  tag?: AppButtonTag;
  download?: boolean;
  disabled?: boolean;
  autoWidth?: boolean;
  size?: AppButtonSize;
  downloadName?: string;
  theme?: AppButtonTheme;
  blank?: AppButtonBlank;
  type?: HTMLButtonElement['type'];
}

export interface AppButtonEmits {
  click: [event: Event];
}

export interface AppButtonSlots {
  default?: () => VNode[];
  prepend?: () => VNode[];
  append?: () => VNode[];
}

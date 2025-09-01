import type { Props } from 'tippy.js';
import type { VNode } from 'vue';

export interface AppTooltipActions {
  close?: (() => void);
}

export interface AppTooltipProps {
  title?: string;
  visible?: boolean;
  trigger?: Props['trigger'];
  appendTo?: Props['appendTo'];
  placement?: Props['placement'];
  interactive?: Props['interactive'];
}
export interface AppTooltipSlots {
  activator?: () => VNode[];
  default?: (scope: { close?: Function }) => VNode[];
}

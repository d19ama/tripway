import type { VNode } from 'vue';

export interface AppAccordionItemProps {
  header?: string;
  body?: string;
}

export interface AppAccordionItemType {
  name: string;
  active: boolean;
}

export interface AppAccordionItemSlots {
  header?: () => VNode[];
  body?: () => VNode[];
}

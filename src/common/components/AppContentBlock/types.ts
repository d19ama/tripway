import type { VNode } from 'vue';

export interface AppContentBlockProps {
  title?: string;
  image?: string;
  description?: string;
}

export interface AppContentBlockSlots {
  image?: (scope: { image: AppContentBlockProps['image'] }) => VNode[];
  title?: (scope: { title: AppContentBlockProps['title'] }) => VNode[];
  description?: (scope: { description: AppContentBlockProps['description'] }) => VNode[];
}

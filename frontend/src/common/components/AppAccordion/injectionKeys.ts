import type {
  InjectionKey,
  Ref,
} from 'vue';
import type { AppAccordionItemType } from './components';

export const APP_ACCORDION_STATE: InjectionKey<Ref<AppAccordionItemType[]>> = Symbol.for('AppAccordion.State');

export interface Styles {
  'breakpoint-default': string;
  'breakpoint-desktop': string;
  'breakpoint-tablet': string;
  'breakpoint-mobile': string;
  'breakpoint-v-mobile': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

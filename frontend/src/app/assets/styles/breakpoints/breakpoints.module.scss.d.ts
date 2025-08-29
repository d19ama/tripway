export interface Styles {
  'display-xl': string;
  'display-lg': string;
  'display-md': string;
  'display-sm': string;
  'display-xs': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

export interface Styles {
  'white': string;
  'black': string;
  'black-50': string;
  'primary': string;
  'primary-2': string;
  'secondary': string;
  'secondary-2': string;
  'secondary-3': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

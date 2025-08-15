export interface Styles {
  'white': string;
  'black': string;
  'black-50': string;

  'gray-dark': string;
  'gray-lite': string;
  'gray-middle': string;

  'blue-dark': string;
  'blue-middle': string;
  'blue-lite': string;

  'red': string;
  'red-dark': string;

  'green': string;
  'green-dark': string;

  'yellow': string;
  'yellow-dark': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

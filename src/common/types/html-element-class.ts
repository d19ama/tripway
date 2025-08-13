export type HTMLElementClass =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];

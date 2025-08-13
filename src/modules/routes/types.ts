export interface Route {
  id: string | null;
  name: string;
  costs?: number;
  opened: boolean;
  selected: boolean;
  date: [number, number];
}

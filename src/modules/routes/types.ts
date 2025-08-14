export interface Route {
  id: string;
  name: string;
  costs?: number;
  opened: boolean;
  active: boolean;
  date: [number, number];
}

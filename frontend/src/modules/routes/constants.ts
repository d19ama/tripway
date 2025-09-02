import type { RouteEntity } from './types';

export const DEFAULT_ROUTE: RouteEntity = {
  id: '',
  name: '',
  state: 'new',
  opened: false,
  active: false,
  costs: 0,
  startDate: '',
  endDate: '',
  createdAt: '',
  updatedAt: '',
  routeSections: [],
};

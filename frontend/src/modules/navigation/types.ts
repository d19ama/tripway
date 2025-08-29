import type {
  RouteLocationNamedRaw,
  RouteRecordName,
} from 'vue-router';

export interface NavigationBreadcrumbs {
  label: string;
  name: RouteRecordName;
  route: RouteLocationNamedRaw;
}

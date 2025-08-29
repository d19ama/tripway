import type { NavigationGuard } from 'vue-router';
import { RouteNames } from '../route-names';
import { useToken } from '@/modules/auth';

export function isAuthenticated(): NavigationGuard {
  return (
    to,
    from,
    next,
  ) => {
    const {
      isAuthenticated,
    } = useToken();

    if (to.meta.auth === 'public') {
      return next();
    }

    if (to.meta.auth === 'private' && !isAuthenticated.value) {
      return next({
        name: RouteNames.Home,
      });
    }

    return next();
  };
}

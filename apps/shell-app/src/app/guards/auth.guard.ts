import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { signal_AccessToken } from '../signals/signals';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  if (!signal_AccessToken()) {
    router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return true;
};

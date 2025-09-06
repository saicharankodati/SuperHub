import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { signal_AccessToken } from '../signals/signals';

export const UnauthGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (signal_AccessToken()) {
    router.navigate(['/users']);
    return false;
  }

  return true;
};
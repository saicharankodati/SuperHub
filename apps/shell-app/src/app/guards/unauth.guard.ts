import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { IndexedDBService } from '../services/indexeddb.service';

export const UnauthGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const indexedDBService = inject(IndexedDBService);

  const isDBReady = await indexedDBService.ready();
  if (!isDBReady) {
    router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  await indexedDBService.get('userContext', 1);
  const userContext = indexedDBService.indexedDBSignal();
  if (userContext) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};

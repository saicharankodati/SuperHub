import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { IndexedDBService } from '../services/indexeddb.service';

// export const AuthGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const router = inject(Router);
//   const indexedDBService = inject(IndexedDBService);
  
//   let hasUserContext = false;
//   await indexedDBService.ready().then(async (isDBReady) => {
//     if(isDBReady) {
//       await indexedDBService.get('userContext', 1).then(() => {
//         if (indexedDBService.indexedDBSignal()) {
//           hasUserContext = true;
//         }
//       });
//     }
//   });
  
//   if(!hasUserContext) {
//     return router.createUrlTree(['/auth'], { queryParams: { returnUrl: state.url } });
//   }

//   return true;
// };

export const AuthGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  // const indexedDBService = inject(IndexedDBService);

  // const isDBReady = await indexedDBService.ready();
  // if (!isDBReady) return router.createUrlTree(['/auth'], { queryParams: { returnUrl: state.url } });

  // await indexedDBService.get('userContext', 1);
  // const userContext = indexedDBService.indexedDBSignal();
  // const hasUserContext = !!userContext || !!indexedDBService.indexedDBSignal();
  const hasUserContext = false;

  return hasUserContext
    ? true
    : router.createUrlTree(['/auth'], { queryParams: { returnUrl: state.url } });
};


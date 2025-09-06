import { HttpInterceptorFn } from '@angular/common/http';
import { signal_AccessToken } from '../signals/signals';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = signal_AccessToken();
  const modifiedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(modifiedReq);
};

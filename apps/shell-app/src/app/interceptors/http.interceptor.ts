import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { signal_AccessToken } from '../signals/signals';

export const HttpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const modifiedReq = handleRequest(req);
  return next(modifiedReq).pipe(handleResponse());
};

function handleRequest(req: HttpRequest<any>): HttpRequest<any> {
  const token = signal_AccessToken();
  return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
}

function handleResponse<T extends HttpEvent<any>>() {
  return tap<T>({
    next: (event) => {
      console.log('Response received:', event);
    },
    error: (err) => {
      console.error('HTTP Error:', err);
    }
  });
}

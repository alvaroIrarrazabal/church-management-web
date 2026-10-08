import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const isAuthRequest = req.url.includes('/auth/');

  if (token && !isAuthRequest) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
    return next(authReq);
  }

  return next(req);
};

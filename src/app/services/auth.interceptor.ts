import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth/login')) {
    console.log('Ignorando interceptor para login:', req);
    return next(req);
  }
  const token = localStorage.getItem('token');
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    console.log('Enviando requisição com token:', clonedRequest);
    return next(clonedRequest);
  }
  console.log('Requisição sem token:', req);
  return next(req);
};
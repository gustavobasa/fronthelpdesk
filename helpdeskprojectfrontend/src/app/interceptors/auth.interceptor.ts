import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  
  // Verifica se estamos rodando no navegador (para evitar erros de SSR)
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Clona a requisição original e adiciona o cabeçalho Authorization com o Token
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(authReq);
    }
  }

  // Se não tiver token, segue com a requisição normal
  return next(req);
};
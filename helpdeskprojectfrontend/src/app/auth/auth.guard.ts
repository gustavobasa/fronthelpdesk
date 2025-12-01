import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se estiver autenticado, deixa passar
  if (authService.isAuthenticated()) {
    return true;
  } 
  
  // Se não, manda pro login
  router.navigate(['/login']);
  return false;
};
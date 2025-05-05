import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const user = sessionStorage.getItem('user');
  const router = inject(Router);
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

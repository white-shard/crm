import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function AuthorizedAccessGuard() {
  const isAuth = !!localStorage.getItem('authenticated');

  if (isAuth) return true;
  return inject(Router).createUrlTree(['/auth']);
}

export function NotAuthorizedAccessGuard() {
  const isAuth = !!localStorage.getItem('authenticated');

  if (!isAuth) return true;
  return inject(Router).createUrlTree(['/dashboard']);
}

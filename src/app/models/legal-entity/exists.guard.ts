import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LegalEntityService } from './legal-entity.service';

export function LegalEntityExistsGuard() {
  const router = inject(Router);
  return inject(LegalEntityService)
    .find()
    .pipe(
      map((res) => (res ? true : router.createUrlTree(['/create']))),
      catchError(() => of(false)),
    );
}

export function LegalEntityNotExistsGuard() {
  const router = inject(Router);
  return inject(LegalEntityService)
    .find()
    .pipe(
      map((res) => (res ? router.createUrlTree(['/dashboard']) : true)),
      catchError(() => of(false)),
    );
}

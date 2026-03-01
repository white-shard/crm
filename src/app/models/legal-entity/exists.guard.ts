import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LegalEntityService } from './legal-entity.service';

export function LegalEntityExistsGuard() {
  const router = inject(Router);
  return inject(LegalEntityService)
    .find()
    .pipe(
      map((res) => !!res),
      catchError(() => of(router.createUrlTree(['/create']))),
    );
}

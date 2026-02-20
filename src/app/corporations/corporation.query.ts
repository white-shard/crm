import { inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { CorporationService } from './corporation.service';

export const corpQueryKeys = {
  all: () => ['corporations'] as const,
};

export function injectAllUserCorporations() {
  const corporationService = inject(CorporationService);
  return injectQuery(() => ({
    queryKey: corpQueryKeys.all(),
    queryFn: () => lastValueFrom(corporationService.getAll()),
  }));
}

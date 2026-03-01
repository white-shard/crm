import { inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { LegalEntityService } from './legal-entity.service';

export const legalEntityQueryKeys = {
  all: () => ['legal-entities'] as const,
};

export function injectFindLegalEntity() {
  const leService = inject(LegalEntityService);
  return injectQuery(() => ({
    queryKey: legalEntityQueryKeys.all(),
    queryFn: () => lastValueFrom(leService.find()),
  }));
}

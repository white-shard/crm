import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { CreateLegalEntityDto } from './legal-entity.dto';
import { legalEntityQueryKeys } from './legal-entity.query';
import { LegalEntityService } from './legal-entity.service';

export function injectCreateLegalEntityMutation() {
  const entityService = inject(LegalEntityService);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationFn: async (data: CreateLegalEntityDto) => lastValueFrom(entityService.create(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: legalEntityQueryKeys.all() });
    },
  }));
}

import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { corpQueryKeys } from './corporation.query';
import { CorporationService } from './corporation.service';
import { CreateCorporationRequestDTO } from './dto/create.dto';

export function injectCreateCorporationMutation() {
  const corporationService = inject(CorporationService);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationFn: async (data: CreateCorporationRequestDTO) =>
      lastValueFrom(corporationService.create(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: corpQueryKeys.all() });
    },
  }));
}

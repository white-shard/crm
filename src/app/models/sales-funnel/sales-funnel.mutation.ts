import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysSalesFunnel } from './inject.dto';
import { UpdateSalesFunnelDto } from './sales-funnel.dto';
import { SalesFunnelService } from './sales-funnel.service';

export function injectUpdateSalesFunnelMutation() {
  const funnelService = inject(SalesFunnelService);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationFn: async ({ id, data }: { id: string; data: UpdateSalesFunnelDto }) =>
      lastValueFrom(funnelService.update(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KeysSalesFunnel.all() });
    },
  }));
}

export function injectRemoveSalesFunnelMutation() {
  const funnelService = inject(SalesFunnelService);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationFn: async (id: string) => lastValueFrom(funnelService.remove(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KeysSalesFunnel.all() });
    },
  }));
}

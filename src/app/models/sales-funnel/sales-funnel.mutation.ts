import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { CreateSalesFunnelDto, UpdateSalesFunnelDto } from './sales-funnel.dto';
import { salesFunnelQueryKeys } from './sales-funnel.query';
import { SalesFunnelService } from './sales-funnel.service';

export function injectCreateSalesFunnelMutation() {
  const funnelService = inject(SalesFunnelService);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationFn: async (data: CreateSalesFunnelDto) => lastValueFrom(funnelService.create(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesFunnelQueryKeys.all() });
    },
  }));
}

export function injectUpdateSalesFunnelMutation() {
  const funnelService = inject(SalesFunnelService);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationFn: async ({ id, data }: { id: string; data: UpdateSalesFunnelDto }) =>
      lastValueFrom(funnelService.update(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesFunnelQueryKeys.all() });
    },
  }));
}

export function injectRemoveSalesFunnelMutation() {
  const funnelService = inject(SalesFunnelService);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationFn: async (id: string) => lastValueFrom(funnelService.remove(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesFunnelQueryKeys.all() });
    },
  }));
}

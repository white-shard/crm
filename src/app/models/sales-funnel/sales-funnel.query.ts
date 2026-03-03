import { inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { SalesFunnelService } from './sales-funnel.service';

export const salesFunnelQueryKeys = {
  all: () => ['sales-funnels'] as const,
};

export function injectFindAllSalesFunnel() {
  const funnelService = inject(SalesFunnelService);
  return injectQuery(() => ({
    queryKey: salesFunnelQueryKeys.all(),
    queryFn: () => lastValueFrom(funnelService.findAll()),
  }));
}

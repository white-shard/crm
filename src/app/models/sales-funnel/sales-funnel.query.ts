import { inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysSalesFunnel } from './inject.dto';
import { SalesFunnelService } from './sales-funnel.service';

export function injectFindAllSalesFunnel() {
  const funnelService = inject(SalesFunnelService);
  return injectQuery(() => ({
    queryKey: KeysSalesFunnel.all(),
    queryFn: () => lastValueFrom(funnelService.findAll()),
  }));
}

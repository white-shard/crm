import { inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysLeadStage } from './inject.dto';
import { LeadStageService } from './lead-stage.service';

export function injectFindAllLeadStageByFunnelId(funnelId: string) {
  const funnelService = inject(LeadStageService);
  return injectQuery(() => ({
    queryKey: KeysLeadStage.list(funnelId),
    queryFn: () => lastValueFrom(funnelService.findAllByFunnelId(funnelId)),
  }));
}

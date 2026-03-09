import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysLeadStage } from '../inject.dto';
import { LeadStageDto, LeadStageUpdateDto } from '../lead-stage.dto';
import { LeadStageService } from '../lead-stage.service';

export function injectUpdateLeadStageMutation(funnelId: string) {
  const stageService = inject(LeadStageService);
  const queryClient = inject(QueryClient);
  const queryKey = KeysLeadStage.list(funnelId);

  return injectMutation(() => ({
    mutationFn: async (data: LeadStageUpdateDto) => {
      const { id, ...other } = data;
      return lastValueFrom(stageService.update(id, { ...other }));
    },
    onMutate: async (data: LeadStageUpdateDto) => {
      await queryClient.cancelQueries({ queryKey });

      const previousItems = queryClient.getQueryData<LeadStageDto[]>(queryKey);

      queryClient.setQueryData<LeadStageDto[]>(queryKey, (old) =>
        old?.map((item) => (item.id === data.id ? { ...item, ...data } : item)),
      );

      return { previousItems };
    },

    onError: (_, __, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(queryKey, context.previousItems);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  }));
}

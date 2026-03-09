import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysLeadStage } from '../inject.dto';
import { LeadStageDto } from '../lead-stage.dto';
import { LeadStageService } from '../lead-stage.service';

export function injectRemoveLeadStageMutation(funnelId: string) {
  const stageService = inject(LeadStageService);
  const queryClient = inject(QueryClient);
  const queryKey = KeysLeadStage.list(funnelId);

  return injectMutation(() => ({
    mutationFn: async (id: string) => lastValueFrom(stageService.remove(id)),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey });

      const previousItems = queryClient.getQueryData<LeadStageDto[]>(queryKey);

      queryClient.setQueryData<LeadStageDto[]>(queryKey, (old) =>
        old?.filter((it) => it.id !== id),
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

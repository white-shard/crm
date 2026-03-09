import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysLeadStage } from '../inject.dto';
import { CreateLeadStageDto, LeadStageDto } from '../lead-stage.dto';
import { LeadStageService } from '../lead-stage.service';

export function injectCreateLeadStageMutation(funnelId: string) {
  const stageService = inject(LeadStageService);
  const queryClient = inject(QueryClient);
  const queryKey = KeysLeadStage.list(funnelId);

  const createTempItem = (data: CreateLeadStageDto): LeadStageDto => ({
    ...data,
    id: 'temp-' + Date.now(),
    isArchive: false,
  });

  return injectMutation(() => ({
    mutationFn: async (data: CreateLeadStageDto) => lastValueFrom(stageService.create(data)),

    onMutate: async (data: CreateLeadStageDto) => {
      await queryClient.cancelQueries({ queryKey });

      const previousItems = queryClient.getQueryData<LeadStageDto[]>(queryKey);
      const newItem = createTempItem(data);

      queryClient.setQueryData<LeadStageDto[]>(queryKey, (old) =>
        old ? [...old, newItem] : [newItem],
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

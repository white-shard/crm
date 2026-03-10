import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysLeadStage } from '../inject.dto';
import { ChangeOrderLeadStageDto, LeadStageDto } from '../lead-stage.dto';
import { LeadStageService } from '../lead-stage.service';

export function injectChangeOrderLeadStageMutation(funnelId: string) {
  const stageService = inject(LeadStageService);
  const queryClient = inject(QueryClient);
  const queryKey = KeysLeadStage.list(funnelId);

  return injectMutation(() => ({
    mutationFn: async (data: ChangeOrderLeadStageDto) => {
      const { id, newOrder } = data;
      return lastValueFrom(stageService.changeOrder(id, newOrder));
    },
    onMutate: async (data: ChangeOrderLeadStageDto) => {
      await queryClient.cancelQueries({ queryKey });

      const previousItems = queryClient.getQueryData<LeadStageDto[]>(queryKey);
      const oldOrder = previousItems?.find((it) => it.id === data.id)?.index;

      queryClient.setQueryData<LeadStageDto[]>(queryKey, (old) =>
        old?.map((item) => {
          if (item.index === oldOrder) {
            return { ...item, index: data.newOrder };
          }

          if (item.index === data.newOrder) {
            return { ...item, index: oldOrder! };
          }

          return item;
        }),
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

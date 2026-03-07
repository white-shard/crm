import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysSalesFunnel } from '../inject.dto';
import { SalesFunnelDto } from '../sales-funnel.dto';
import { SalesFunnelService } from '../sales-funnel.service';

export function injectRemoveSalesFunnelMutation() {
  const funnelService = inject(SalesFunnelService);
  const queryClient = inject(QueryClient);
  const queryKey = KeysSalesFunnel.all();

  return injectMutation(() => ({
    mutationFn: async (id: string) => lastValueFrom(funnelService.remove(id)),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey });

      const previousItems = queryClient.getQueryData<SalesFunnelDto[]>(queryKey);

      queryClient.setQueryData<SalesFunnelDto[]>(queryKey, (old) =>
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

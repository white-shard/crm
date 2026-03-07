import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysSalesFunnel } from '../inject.dto';
import { SalesFunnelDto } from '../sales-funnel.dto';
import { SalesFunnelService } from '../sales-funnel.service';

export function injectUpdateSalesFunnelMutation() {
  const funnelService = inject(SalesFunnelService);
  const queryClient = inject(QueryClient);
  const queryKey = KeysSalesFunnel.all();

  return injectMutation(() => ({
    mutationFn: async (updatedItem: SalesFunnelDto) =>
      lastValueFrom(
        funnelService.update(updatedItem.id, {
          displayName: updatedItem.displayName,
          isArchive: updatedItem.isArchive,
        }),
      ),
    onMutate: async (updatedItem: SalesFunnelDto) => {
      await queryClient.cancelQueries({ queryKey });

      const previousItems = queryClient.getQueryData<SalesFunnelDto[]>(queryKey);

      queryClient.setQueryData<SalesFunnelDto[]>(queryKey, (old) =>
        old?.map((item) => (item.id === updatedItem.id ? { ...item, ...updatedItem } : item)),
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

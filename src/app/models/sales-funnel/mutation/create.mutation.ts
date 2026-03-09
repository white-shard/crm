import { inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { KeysSalesFunnel } from '../inject.dto';
import { CreateSalesFunnelDto, SalesFunnelDto } from '../sales-funnel.dto';
import { SalesFunnelService } from '../sales-funnel.service';

export function injectCreateSalesFunnelMutation() {
  const funnelService = inject(SalesFunnelService);
  const queryClient = inject(QueryClient);
  const queryKey = KeysSalesFunnel.all();

  const createTempItem = (data: CreateSalesFunnelDto): SalesFunnelDto => ({
    id: 'temp-' + Date.now(),
    displayName: data.displayName,
    isArchive: false,
  });

  return injectMutation(() => ({
    mutationFn: async (data: CreateSalesFunnelDto) => lastValueFrom(funnelService.create(data)),

    onMutate: async (data: CreateSalesFunnelDto) => {
      await queryClient.cancelQueries({ queryKey });

      const previousItems = queryClient.getQueryData<SalesFunnelDto[]>(queryKey);
      const newItem = createTempItem(data);

      queryClient.setQueryData<SalesFunnelDto[]>(queryKey, (old) =>
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

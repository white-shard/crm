import { injectCreateSalesFunnelMutation } from './mutation/create.mutation';
import { injectRemoveSalesFunnelMutation } from './mutation/remove.mutation';
import { injectUpdateSalesFunnelMutation } from './mutation/update.mutation';
import { injectFindAllSalesFunnel } from './sales-funnel.query';

export const KeysSalesFunnel = {
  all: () => ['sales-funnels'] as const,
  list: () => [...KeysSalesFunnel.all(), 'list'] as const,
  filter: (isArchived: boolean) => [...KeysSalesFunnel.list(), { isArchived }] as const,
  id: (id: string) => [...KeysSalesFunnel.all(), id],
};
export const InjectSalesFunnel = {
  query: {
    findAll: injectFindAllSalesFunnel,
  },
  mutation: {
    create: injectCreateSalesFunnelMutation,
    update: injectUpdateSalesFunnelMutation,
    remove: injectRemoveSalesFunnelMutation,
  },
};

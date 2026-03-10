import { injectFindAllLeadStageByFunnelId } from './lead-stage.query';
import { injectChangeOrderLeadStageMutation } from './mutation/change-order.mutation';
import { injectCreateLeadStageMutation } from './mutation/create.mutation';
import { injectRemoveLeadStageMutation } from './mutation/remove.mutation';
import { injectUpdateLeadStageMutation } from './mutation/update.mutation';

export const KeysLeadStage = {
  all: () => ['lead-stages'] as const,
  list: (funnelId: string) => [...KeysLeadStage.all(), 'list', funnelId] as const,
  id: (id: string) => [...KeysLeadStage.all(), id],
};
export const InjectLeadStage = {
  query: {
    findAll: injectFindAllLeadStageByFunnelId,
  },
  mutation: {
    create: injectCreateLeadStageMutation,
    update: injectUpdateLeadStageMutation,
    remove: injectRemoveLeadStageMutation,
    changeOrder: injectChangeOrderLeadStageMutation,
  },
};

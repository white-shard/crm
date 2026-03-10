export interface CreateLeadStageDto {
  displayName: string;
  color: string;
  index: number;
  funnelId: string;
}

export interface UpdateLeadStageDto {
  displayName?: string;
  color?: string;
  isArchive?: boolean;
}

export interface ChangeOrderLeadStageDto {
  id: string;
  newOrder: number;
}

export interface LeadStageDto {
  id: string;
  displayName: string;
  color: string;
  index: number;
  funnelId: string;
  isArchive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface LeadStageUpdateDto {
  id: string;
  displayName?: string;
  color?: string;
  index?: number;
  isArchive?: boolean;
}

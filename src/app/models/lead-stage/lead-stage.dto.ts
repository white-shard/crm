export interface CreateLeadStageDto {
  displayName: string;
  color: string;
  index: number;
  funnelId: string;
}

export interface UpdateLeadStageDto {
  displayName?: string;
  color?: string;
  index?: number;
  isArchive?: boolean;
}

export interface LeadStageDto {
  id: string;
  displayName: string;
  color: string;
  index: number;
  funnelId: string;
  isArchive: boolean;
}

export interface LeadStageUpdateDto {
  id: string;
  displayName?: string;
  color?: string;
  index?: number;
  isArchive?: boolean;
}

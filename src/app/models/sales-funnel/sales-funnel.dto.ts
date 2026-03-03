export interface CreateSalesFunnelDto {
  displayName: string;
}

export interface UpdateSalesFunnelDto {
  displayName?: string;
  isArchive?: boolean;
}

export interface SalesFunnelDto {
  id: string;
  displayName: string;
  isArchive: boolean;
}

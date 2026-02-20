export interface CreateCorporationRequestDTO {
  name: string;
  publicKey: string;
}

export interface CorporationResponseDTO {
  id: string;
  name: string;
}

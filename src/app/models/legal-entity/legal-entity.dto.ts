export interface CreateLegalEntityDto {
  shortName: string;
  fullName: string;
  logo?: string;
}

export interface LegalEntityDto {
  id: string;
  shortName: string;
  fullName: string;
}

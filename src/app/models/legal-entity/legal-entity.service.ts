import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateLegalEntityDto, LegalEntityDto } from './legal-entity.dto';

@Injectable({
  providedIn: 'root',
})
export class LegalEntityService {
  http = inject(HttpClient);

  baseURL = environment.apiURL + '/legal-entities';

  find() {
    return this.http.get<LegalEntityDto>(this.baseURL, {
      withCredentials: true,
    });
  }

  create(payload: CreateLegalEntityDto) {
    return this.http.post<LegalEntityDto>(this.baseURL, payload, {
      withCredentials: true,
    });
  }

  updateLogo(id: string, file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<LegalEntityDto>(`${this.baseURL}/${id}/update-logo`, formData, {
      withCredentials: true,
    });
  }
}

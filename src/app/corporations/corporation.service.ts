import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CorporationResponseDTO, CreateCorporationRequestDTO } from './dto/create.dto';

@Injectable({
  providedIn: 'root',
})
export class CorporationService {
  http = inject(HttpClient);

  baseURL = environment.apiURL + '/corporations';

  getAll() {
    return this.http.get<CorporationResponseDTO[]>(this.baseURL, {
      withCredentials: true,
    });
  }

  create(payload: CreateCorporationRequestDTO) {
    return this.http.post<CorporationResponseDTO>(this.baseURL, payload, {
      withCredentials: true,
    });
  }
}

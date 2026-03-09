import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateLeadStageDto, LeadStageDto, UpdateLeadStageDto } from './lead-stage.dto';

@Injectable({
  providedIn: 'root',
})
export class LeadStageService {
  http = inject(HttpClient);

  baseURL = environment.apiURL + '/lead-stages';

  findAllByFunnelId(funnelId: string) {
    return this.http.get<LeadStageDto[]>(this.baseURL, {
      withCredentials: true,
      params: { funnelId },
    });
  }

  findById(id: string) {
    return this.http.get<LeadStageDto>(`${this.baseURL}/${id}`, {
      withCredentials: true,
    });
  }

  create(payload: CreateLeadStageDto) {
    return this.http.post<LeadStageDto>(this.baseURL, payload, {
      withCredentials: true,
    });
  }

  update(id: string, payload: UpdateLeadStageDto) {
    return this.http.patch<LeadStageDto>(`${this.baseURL}/${id}`, payload, {
      withCredentials: true,
    });
  }

  remove(id: string) {
    return this.http.delete<LeadStageDto>(`${this.baseURL}/${id}`, {
      withCredentials: true,
    });
  }
}

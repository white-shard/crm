import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateSalesFunnelDto, SalesFunnelDto, UpdateSalesFunnelDto } from './sales-funnel.dto';

@Injectable({
  providedIn: 'root',
})
export class SalesFunnelService {
  http = inject(HttpClient);

  baseURL = environment.apiURL + '/sales-funnels';

  findAll() {
    return this.http.get<SalesFunnelDto[]>(this.baseURL, {
      withCredentials: true,
    });
  }

  findById(id: string) {
    return this.http.get<SalesFunnelDto>(`${this.baseURL}/${id}`, {
      withCredentials: true,
    });
  }

  create(payload: CreateSalesFunnelDto) {
    return this.http.post<SalesFunnelDto>(this.baseURL, payload, {
      withCredentials: true,
    });
  }

  update(id: string, payload: UpdateSalesFunnelDto) {
    return this.http.patch<SalesFunnelDto>(`${this.baseURL}/${id}`, payload, {
      withCredentials: true,
    });
  }

  remove(id: string) {
    return this.http.delete<SalesFunnelDto>(`${this.baseURL}/${id}`, {
      withCredentials: true,
    });
  }
}

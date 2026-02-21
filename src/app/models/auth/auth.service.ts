import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginRequestDTO, LoginResponseDTO } from './dto/login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  baseURL = environment.apiURL + '/auth';

  login(payload: LoginRequestDTO) {
    return this.http
      .post<LoginResponseDTO>(`${this.baseURL}/login`, payload, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          if (!!res.user) {
            localStorage.setItem('authenticated', 'true');
          }
        }),
      );
  }
}

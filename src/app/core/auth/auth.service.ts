import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from './models/login-request';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { LoginResponse } from './models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`,
      credentials,
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/me`);
  }
}

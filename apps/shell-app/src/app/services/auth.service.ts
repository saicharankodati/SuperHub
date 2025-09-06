import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../models/apiresponse.model';
import { signal_AccessToken } from '../signals/signals';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private _apiResponseSignal = signal<ApiResponseModel | null>(null);
  public readonly apiResponseSignal = this._apiResponseSignal.asReadonly();

  signin(email: string | null, password: string | null) {
    return new Promise<void>((resolve) => {
      this.http.get<ApiResponseModel>(`https://localhost:44368/api/user/validate/${email}/${password}`).subscribe({
        next: (res) => {
          this._apiResponseSignal.set(res);
          signal_AccessToken.set(res.data);
          localStorage.setItem('access_token', res.data);
          resolve();
        },
        error: (res) => {
          this._apiResponseSignal.set(res.error);
          signal_AccessToken.set(null);
          localStorage.removeItem('access_token');
          resolve();
        }
      });
    });
  }

  signout() {
    signal_AccessToken.set(null);
    localStorage.removeItem('access_token');
  }

  decodeToken() {
    const token = signal_AccessToken();
    return token ? jwtDecode(token) : null;
  }

  clearSignals() {
    this._apiResponseSignal.set(null);
  }
}

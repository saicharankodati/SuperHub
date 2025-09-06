import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../models/apiresponse.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private _apiResponseSignal = signal<ApiResponseModel | null>(null);
  public readonly apiResponseSignal = this._apiResponseSignal.asReadonly();

  read() {
    return new Promise<void>((resolve) => {
      this.http.get<ApiResponseModel>(`https://localhost:44368/api/user/read`).subscribe({
        next: (res) => {
          this._apiResponseSignal.set(res);
          resolve();
        },
        error: (res) => {
          this._apiResponseSignal.set(res.error);
          resolve();
        }
      });
    });
  }

  clearSignals() {
    this._apiResponseSignal.set(null);
  }
}

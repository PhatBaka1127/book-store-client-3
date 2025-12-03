import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest } from '../../application/dto/auth.dto';
import { Observable } from 'rxjs';
import { ResponseMessage } from 'src/app/presentation/shared/constants/messages';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<ResponseMessage<AuthResponse>> {
    return this.http.post<ResponseMessage<AuthResponse>>(
      `${this.apiUrl}/auth/login`,
      credentials
    );
  }
}

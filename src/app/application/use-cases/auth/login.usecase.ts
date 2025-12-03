import { Injectable } from '@angular/core';
import { AuthApiService } from '../../../infrastructure/http/auth.api.service';
import { AuthResponse, LoginRequest } from '../../dto/auth.dto';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../../domain/entities/user.entity';
import { ResponseMessage } from 'src/app/presentation/shared/constants/messages';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(private authApi: AuthApiService) {}

  execute(request: LoginRequest): Observable<User> {
    return this.authApi.login(request).pipe(
      map((res: ResponseMessage<AuthResponse>) => {
        if (!res.value) throw new Error(res.message || 'Login failed');
        const value = res.value;
        return new User(
          value.id,
          value.email,
          value.role,
          value.status,
          value.accessToken,
          value.refreshToken,
          new Date(value.expireAt)
        );
      })
    );
  }
}

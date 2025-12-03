import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginRequest } from 'src/app/application/dto/auth.dto';
import { LoginUseCase } from 'src/app/application/use-cases/auth/login.usecase';
import { User } from 'src/app/domain/entities/user.entity';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEYS } from '../constants/cookie-keys';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;

  constructor(
    private loginUseCase: LoginUseCase,
    private cookieService: CookieService
  ) {}

  login(request: LoginRequest) {
    return this.loginUseCase.execute(request).pipe(
      tap((user) => {
        this.cookieService.set(COOKIE_KEYS.ACCESS_TOKEN, user.accessToken, undefined, '/');
        this.cookieService.set(COOKIE_KEYS.REFRESH_TOKEN, user.refreshToken, undefined, '/');
        this.cookieService.set(
          COOKIE_KEYS.USER,
          JSON.stringify({
            id: user.id,
            email: user.email,
            role: user.role,
          }),
          undefined,
          '/'
        );

        this.currentUser = user;
      })
    );
  }

  logout() {
    this.cookieService.delete(COOKIE_KEYS.ACCESS_TOKEN, '/');
    this.cookieService.delete(COOKIE_KEYS.REFRESH_TOKEN, '/');
    this.cookieService.delete(COOKIE_KEYS.USER, '/');
    this.currentUser = null;
  }

  getAccessToken(): string | null {
    return this.cookieService.get(COOKIE_KEYS.ACCESS_TOKEN) || null;
  }
}

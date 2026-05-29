import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { distinctUntilChanged, map, ReplaySubject, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from '../entities/user.entity';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected http = inject(HttpClient);
  protected jwtSrv = inject(JwtService);
  protected router = inject(Router);

  protected _currentUser$ = new ReplaySubject<User | null>(1);
  currentUser$ = this._currentUser$.asObservable();

  // 👇 stato interno sincronizzato
  private _currentUser: User | null = null;

  constructor() {
    const token = this.jwtSrv.getToken();

    if (token) {
      const decoded = this.jwtSrv.decodeToken<User>();

      if (decoded) {
        this._currentUser = decoded;
        this._currentUser$.next(decoded);
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  // 👇 COMODO PER ROUTING GUARDS
  isLoggedIn(): boolean {
    return !!this._currentUser && !!this.jwtSrv.getToken();
  }

  isAuthenticated$ = this.currentUser$.pipe(
    map(user => !!user),
    distinctUntilChanged()
  );

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          this.jwtSrv.setToken(res.token);
          this._currentUser = res.user;
          this._currentUser$.next(res.user);
        }),
        map(res => res.user)
      );
  }

  register(user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const {...payload } = user;

  return this.http.post<User>(`${environment.apiUrl}/register`, payload);
}

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser = null;
    this._currentUser$.next(null);
    this.router.navigate(['/login']);
  }
}
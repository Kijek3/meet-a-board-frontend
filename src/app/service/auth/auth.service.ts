import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, LoginResponse } from 'src/app/model/login.model';
import { RegisterForm } from 'src/app/model/register.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { TokenInfo } from 'src/app/model/token.model';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn = new BehaviorSubject<boolean>(false);

  private _token: string;
  get token() {
    return this._token;
  }
  set token(value: string) {
    this._token = value;
  }

  private _userId: string;
  get userId() {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Serwer nie mógł poprawnie przetworzyć żądania. Spróbuj ponownie później';
    if (error.status === 401) {
      errorMessage = 'Zły login lub hasło';
    }
    if (error.status === 409) {
      errorMessage = 'Użytkownik o tym adresie e-mail już istnieje w serwisie';
    }
    return throwError(() => new Error(errorMessage));
  }

  private setToken(token: string, remember: boolean): void {
    this.token = token;
    remember ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);
  }

  private logUser(): void {
    this.userLoggedIn.next(true);
    this.router.navigateByUrl('/');
  }

  login(args: LoginForm): Observable<void> {
    return this.http.post<LoginResponse>(`${environment.API_url}/auth/login`, { ...args }).pipe(
      catchError(this.handleError)
    ).pipe(
      map(result => {
        this.setToken(result.token, args.remember);
        this.userId = result.userId;
        this.logUser();
      })
    );
  }

  register(args: RegisterForm): Observable<void> {
    return this.http.put<LoginResponse>(`${environment.API_url}/auth/register`, { ...args }).pipe(
      catchError(this.handleError)
    ).pipe(
      map(result => {
        this.setToken(result.token, false);
        this.userId = result.userId;
        this.logUser();
      })
    );
  }

  getUserInfo(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.API_url}/user/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  checkToken(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      return;
    }

    this.token = token;
    const tokenDecoded = jwtDecode(token) as TokenInfo;
    this.userId = tokenDecoded.user_id;
    const currentTime = Math.floor(Date.now() / 1000);
    this.userLoggedIn.next(tokenDecoded.exp > currentTime);
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.userLoggedIn.next(false);
  }
}

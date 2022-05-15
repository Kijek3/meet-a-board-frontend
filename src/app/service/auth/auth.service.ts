import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, LoginResponse } from 'src/app/model/login.model';
import { RegisterForm } from 'src/app/model/register.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { TokenInfo } from 'src/app/model/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn = new BehaviorSubject<boolean>(false);

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

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private logUser(token: string): void {
    this.setToken(token);
    this.userLoggedIn.next(true);
    this.router.navigateByUrl('/');
  }

  login(args: LoginForm): Observable<void> {
    return this.http.post<LoginResponse>('http://localhost:8000/auth/login', { ...args }).pipe(
      catchError(this.handleError)
    ).pipe(
      map(result => {
        this.logUser(result.token);
      })
    );
  }

  register(args: RegisterForm): Observable<void> {
    return this.http.put<LoginResponse>('http://localhost:8000/auth/register', { ...args }).pipe(
      catchError(this.handleError)
    ).pipe(
      map(result => {
        this.logUser(result.token);
      })
    );
  }

  checkToken(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const tokenDecoded = jwtDecode(token) as TokenInfo;
    const currentTime = Math.floor(Date.now() / 1000);
    this.userLoggedIn.next(tokenDecoded.exp > currentTime);
    this.router.navigateByUrl('/');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userLoggedIn.next(false);
  }
}

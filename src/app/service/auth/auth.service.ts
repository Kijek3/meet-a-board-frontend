import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, LoginResponse } from 'src/app/model/login.model';
import { RegisterForm } from 'src/app/model/register.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { TokenInfo } from 'src/app/model/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Serwer nie mógł poprawnie przetworzyć żądania. Spróbuj ponownie później';
    if (error.status === 401) {
      errorMessage = 'Zły login lub hasło';
    }
    return throwError(() => new Error(errorMessage));
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  login(args: LoginForm): Observable<void> {
    return this.http.post<LoginResponse>('http://localhost:8000/auth/login', { ...args }).pipe(
      catchError(this.handleError)
    ).pipe(
      map(result => {
        this.setToken(result.token);
        this.userLoggedIn.next(true);
      })
    );
  }

  register(args: RegisterForm) {
    return this.http.put('http://localhost:8000/auth/register', { ...args }).pipe(
      catchError(this.handleError)
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
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userLoggedIn.next(false);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from 'src/app/model/login.model';
import { RegisterForm } from 'src/app/model/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn = false;
  private _token: string;

  constructor(
    private http: HttpClient,
  ) { }

  login(args: LoginForm) {
    return this.http.post('http://localhost:8000/auth/login', { ...args });
  }

  register(args: RegisterForm) {
    return this.http.post('http://localhost:8000/auth/register', { ...args });
  }
}

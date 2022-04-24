import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    remember: new FormControl(false),
  });

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  onLogin(): void {
    this.messageService.clear();
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add(
          {
            severity:'success',
            summary: 'Nice',
            detail: 'You are logged in'
          }
        );
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Wrong credentials',
              detail: 'Bad login or password'
            }
          );
        }
      },
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loading = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) { }

  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['', Validators.required],
    remember: [false],
  });

  onLogin(): void {
    this.loading = true;
    this.messageService.clear();
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error: Error) => {
        this.loading = false;
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Nie udało się zalogować',
            detail: error.message,
          }
        );
      },
    });
  }
}

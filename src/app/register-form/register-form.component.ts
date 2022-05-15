import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['', Validators.required],
    dob: ['', Validators.required],
    city: ['', Validators.required],
  });

  onRegister(): void {
    this.messageService.clear();
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Nie udało się zarejestrować',
            detail: error.message,
          }
        );
      },
    });
  }
}

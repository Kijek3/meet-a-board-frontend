import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    dob: new FormControl('', [
      Validators.required,
    ]),
    city: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  onRegister(): void {
    this.messageService.clear();
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add(
          {
            severity:'success',
            summary: 'User created',
            detail: 'You can now log in to your account'
          }
        );
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'User already exists',
              detail: 'Please log in to your account'
            }
          );
        }
      },
    });
  }
}

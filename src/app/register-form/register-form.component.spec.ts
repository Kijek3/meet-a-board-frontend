import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { of } from 'rxjs';
import { RegisterForm } from '../model/register.model';
import { AuthService } from '../service/auth/auth.service';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  let authRegisterSpy: unknown;
  let messageClearSpy: unknown;

  let registerFormGroup: FormGroup;

  beforeEach(async () => {
    const authServiceStub = jasmine.createSpyObj('AuthService', ['register']);
    const messageServiceStub = jasmine.createSpyObj('MessageService', ['add', 'clear']);

    authRegisterSpy = authServiceStub.register.and.returnValue(of(null));
    messageClearSpy = messageServiceStub.clear;

    await TestBed.configureTestingModule({
      declarations: [
        RegisterFormComponent,
      ],
      imports: [
        ReactiveFormsModule,
        PasswordModule,
        CalendarModule,
        ButtonModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
        {
          provide: MessageService,
          useValue: messageServiceStub,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    registerFormGroup = component.registerForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onRegister', () => {
    it('should clear all messages in MessageService', () => {
      component.onRegister();

      expect(messageClearSpy).toHaveBeenCalledTimes(1);
    });

    it('should call authService with proper args', () => {
      const formValues: RegisterForm = {
        email: 'aaa@ddd',
        password: 'asd',
        firstName: 'Aaa',
        lastName: 'Bbb',
        city: 'Ccc',
        dob: '15-06-2022',
      };

      registerFormGroup.setValue(formValues);

      component.onRegister();
      expect(authRegisterSpy).toHaveBeenCalledWith(formValues);
    });
  });
});

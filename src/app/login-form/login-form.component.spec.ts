import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { of } from 'rxjs';
import { LoginForm } from '../model/login.model';
import { AuthService } from '../service/auth/auth.service';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let authLoginSpy: any;
  let messageClearSpy: any;

  let loginFormGroup: FormGroup;

  const fields = [
    { name: 'email', required: true },
    { name: 'password', required: true },
    { name: 'remember', required: false },
  ];

  beforeEach(async () => {
    const authServiceStub = jasmine.createSpyObj('AuthService', ['login']);
    const messageServiceStub = jasmine.createSpyObj('MessageService', ['add', 'clear']);

    authLoginSpy = authServiceStub.login.and.returnValue(of(null));
    messageClearSpy = messageServiceStub.clear;

    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [
        ReactiveFormsModule,
        PasswordModule,
        CheckboxModule,
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
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    loginFormGroup = component.loginForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Reactive form', () => {
    it('should set init values in the form', () => {
      const loginFormValues = {
        email: '',
        password: '',
        remember: false,
      };
  
      expect(loginFormGroup.value).toEqual(loginFormValues);
    });

    fields.filter((item) => item.required).forEach((item) => {
      it(`should check required field '${item.name}' validator on init`, () => {
        const loginFormGroupControl = loginFormGroup.get(item.name);

        expect(loginFormGroupControl.errors).not.toBeNull();
        expect(loginFormGroupControl.errors['required']).toBeTruthy();
      });
    });

    it('should check email validator for email field', () => {
      const loginFormGroupControl = loginFormGroup.get('email');
      loginFormGroupControl.setValue('aaa');

      expect(loginFormGroupControl.errors).not.toBeNull();
      expect(loginFormGroupControl.errors['email']).toBeTruthy();

      loginFormGroupControl.setValue('aaa@');
      expect(loginFormGroupControl.errors).not.toBeNull();
      expect(loginFormGroupControl.errors['email']).toBeTruthy();

      loginFormGroupControl.setValue('aaa@dsa');
      expect(loginFormGroupControl.errors).toBeNull();
    });
  });

  describe('onLogin', () => {
    it('should clear all messages in MessageService', () => {
      component.onLogin();

      expect(messageClearSpy).toHaveBeenCalledTimes(1);
    });

    it('should call authService with proper args', () => {
      const formValues: LoginForm = {
        email: 'aaa@ddd',
        password: 'asd',
        remember: false,
      };

      loginFormGroup.setValue(formValues);

      component.onLogin();
      expect(authLoginSpy).toHaveBeenCalledWith(formValues);
    });
  });
});

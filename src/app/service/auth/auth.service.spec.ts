import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginForm, LoginResponse } from 'src/app/model/login.model';
import { RegisterForm } from 'src/app/model/register.model';
import { UserInfo } from 'src/app/model/user.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make login request without remember', (done: DoneFn) => {
    const expectedLogin: LoginResponse = {
      userId: '123',
      token: 'a.b.c',
    };
    const loginData: LoginForm = {
      email: 'abc@def',
      password: 'abcdef',
      remember: false,
    };
    service.login(loginData).subscribe({
      next: () => {
        expect(service.token).toBe('a.b.c');
        expect(service.userId).toBe('123');
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(expectedLogin);
    expect(service).toBeTruthy();
  });

  it('should make login request with remember', (done: DoneFn) => {
    const expectedLogin: LoginResponse = {
      userId: '123',
      token: 'a.b.c',
    };
    const loginData: LoginForm = {
      email: 'abc@def',
      password: 'abcdef',
      remember: true,
    };
    service.login(loginData).subscribe({
      next: () => {
        expect(service.token).toBe('a.b.c');
        expect(service.userId).toBe('123');
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(expectedLogin);
    expect(service).toBeTruthy();
  });

  it('should make register request', (done: DoneFn) => {
    const expectedLogin: LoginResponse = {
      userId: '123',
      token: 'a.b.c',
    };
    const registerData: RegisterForm = {
      email: 'aaa@ddd',
      password: 'asd',
      firstName: 'Aaa',
      lastName: 'Bbb',
      city: 'Ccc',
      dob: '15-06-2022',
    };
    service.register(registerData).subscribe({
      next: () => {
        expect(service.token).toBe('a.b.c');
        expect(service.userId).toBe('123');
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/auth/register');
    expect(req.request.method).toEqual('PUT');
    req.flush(expectedLogin);
  });

  it('should make getUserInfo request', (done: DoneFn) => {
    const userInfo: UserInfo = {
      firstName: 'Aaa',
      lastName: 'Bbb',
      city: 'Ccc',
      dob: '15-06-2022',
      description: 'asd',
    };
    service.getUserInfo('123').subscribe({
      next: (data) => {
        expect(data).toEqual(userInfo);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/user/123');
    expect(req.request.method).toEqual('GET');
    req.flush(userInfo);
  });

  xit('should checkToken if token not provided', () => {
    service.checkToken();
    expect(service.token).toBeDefined();
  });

  
});

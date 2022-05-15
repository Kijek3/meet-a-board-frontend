import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../service/auth/auth.service';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authServiceStub: Partial<AuthService>;
  let messageServiceStub: Partial<MessageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterFormComponent,
      ],
      imports: [
        ReactiveFormsModule,
        PasswordModule,
        CheckboxModule,
        CalendarModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

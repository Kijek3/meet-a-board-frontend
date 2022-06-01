import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../service/auth/auth.service';
import { EventFormComponent } from './event-form.component';

describe('RegisterFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;
  let authServiceStub: Partial<AuthService>;
  let messageServiceStub: Partial<MessageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventFormComponent,
      ],
      imports: [
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

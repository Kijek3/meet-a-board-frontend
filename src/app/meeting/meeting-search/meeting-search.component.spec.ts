import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MeetingService } from 'src/app/service/meeting/meeting.service';

import { MeetingSearchComponent } from './meeting-search.component';

describe('MeetingSearchComponent', () => {
  let component: MeetingSearchComponent;
  let fixture: ComponentFixture<MeetingSearchComponent>;

  beforeEach(async () => {
    const meetingServiceStub = jasmine.createSpyObj('MeetingService', ['searchMeetings', 'searchPhrase']);

    

    await TestBed.configureTestingModule({
      declarations: [ MeetingSearchComponent ],
      imports: [
        FormsModule,
        CalendarModule,
        InputTextModule,
      ],
      providers: [
        {
          provide: MeetingService,
          useValue: meetingServiceStub,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

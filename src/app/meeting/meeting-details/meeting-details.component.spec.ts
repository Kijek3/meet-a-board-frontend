import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { GameLanguage } from 'src/app/model/game.model';
import { MeetingItem } from 'src/app/model/meeting.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MeetingService } from 'src/app/service/meeting/meeting.service';

import { MeetingDetailsComponent } from './meeting-details.component';

describe('MeetingDetailsComponent', () => {
  let component: MeetingDetailsComponent;
  let fixture: ComponentFixture<MeetingDetailsComponent>;

  let joinMeetingSpy: unknown;
  let removeMeetingSpy: unknown;

  const meetingItemMock: MeetingItem = {
    '_id':'6297cac3badd852bf28988c2',
    'userId':'62975c872110dd95ac41ab67',
    'title':'Rolowanko',
    'date':'2022-06-13T22:00:00.000Z',
    'startHour':'18:00',
    'endHour':'20:00',
    'city':'Wieliczka',
    'address':'Kościsko 22',
    'isInPublicPlace':false,
    'game': {
      'id':'291794',
      'title':'Dice Throne: Season One ReRolled',
      'thumbnail':'https://cf.geekdo-images.com/EwHWnen78Ni1XiAlaD_klQ__thumb/img/ex05y12pPGTJUJ5HyOhellZvRoU=/fit-in/200x150/filters:strip_icc()/pic5944424.jpg',
      'minPlayers':2,
      'maxPlayers':6,
      'playingTime':40,
    },
    'description':'',
    'gameLanguage':GameLanguage.ENGLISH,
    'guests':[
      {
        'userId':'6294f1a616584a5b1805bd21',
      'isAccepted':true,
      },
    ],
  };

  beforeEach(async () => {
    const authServiceStub = jasmine.createSpyObj('AuthService', ['getUserInfo'], ['userId']);
    const meetingServiceStub = jasmine.createSpyObj('MeetingService', ['joinMeeting', 'removeMeeting', 'acceptGuest', 'declineGuest', 'getMeeting']);
    const messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);

    meetingServiceStub.getMeeting.and.returnValue(of(meetingItemMock));
    joinMeetingSpy = meetingServiceStub.joinMeeting.and.returnValue(of(null));
    removeMeetingSpy = meetingServiceStub.removeMeeting.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      declarations: [ MeetingDetailsComponent ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
        {
          provide: MeetingService,
          useValue: meetingServiceStub,
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
    fixture = TestBed.createComponent(MeetingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get meeting on init', () => {
    expect(component.meetingItem).toEqual(meetingItemMock);
  });

  it('should call joinMeeting', () => {
    component.joinMeeting();

    expect(joinMeetingSpy).toHaveBeenCalled();
  });

  it('should call removeMeeting', () => {
    component.removeMeeting();

    expect(removeMeetingSpy).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { GameLanguage } from 'src/app/model/game.model';
import { MeetingItem } from 'src/app/model/meeting.model';
import { UserInfo } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MeetingService } from 'src/app/service/meeting/meeting.service';

import { MeetingDetailsComponent } from './meeting-details.component';

describe('MeetingDetailsComponent', () => {
  let component: MeetingDetailsComponent;
  let fixture: ComponentFixture<MeetingDetailsComponent>;

  let messageAddSpy: unknown;
  let joinMeetingSpy: unknown;
  let removeMeetingSpy: unknown;
  let acceptGuestSpy: unknown;
  let declineGuestSpy: unknown;

  const meetingItemMock: MeetingItem = {
    '_id':'6297cac3badd852bf28988c2',
    'userId':'123',
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
        'userId':'123',
        'isAccepted':true,
      },
    ],
  };

  const guests: UserInfo[] = [
    {
      user: {
        userId: '123',
        isAccepted: false,
      },
      firstName: 'Aaa',
      lastName: 'Bbb',
      city: 'CCC',
      dob: '2000-01-15',
      description: 'Ddd',
    },
    {
      user: {
        userId: '234',
        isAccepted: false,
      },
      firstName: 'Eee',
      lastName: 'Fff',
      city: 'GGG',
      dob: '2000-03-14',
      description: 'Hhh',
    },
    {
      user: {
        userId: '345',
        isAccepted: true,
      },
      firstName: 'Eee',
      lastName: 'Fff',
      city: 'GGG',
      dob: '2000-03-14',
      description: 'Hhh',
    },
  ];

  beforeEach(async () => {
    const authServiceStub = jasmine.createSpyObj('AuthService', ['getUserInfo'], { 'userId': '123' });
    const meetingServiceStub = jasmine.createSpyObj('MeetingService', ['joinMeeting', 'removeMeeting', 'acceptGuest', 'declineGuest', 'getMeeting']);
    const messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);

    authServiceStub.getUserInfo.and.returnValue(of(guests));

    messageAddSpy = messageServiceStub.add;

    meetingServiceStub.getMeeting.and.returnValue(of(meetingItemMock));
    joinMeetingSpy = meetingServiceStub.joinMeeting.and.returnValue(of(null));
    removeMeetingSpy = meetingServiceStub.removeMeeting.and.returnValue(of(null));
    acceptGuestSpy = meetingServiceStub.acceptGuest.and.returnValue(of(null));
    declineGuestSpy = meetingServiceStub.declineGuest.and.returnValue(of(null));

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
    expect(messageAddSpy).toHaveBeenCalled();
  });

  it('should call removeMeeting', () => {
    component.removeMeeting();

    expect(removeMeetingSpy).toHaveBeenCalled();
  });

  it('should call acceptGuest', () => {
    component.guests = guests;

    component.acceptGuest(guests[1]);

    expect(acceptGuestSpy).toHaveBeenCalled();
    expect(component.guests[2].user.isAccepted).toBeTrue();
    expect(messageAddSpy).toHaveBeenCalled();
  });

  it('should call declineGuest', () => {
    component.guests = guests;

    component.declineGuest(guests[1]);

    expect(declineGuestSpy).toHaveBeenCalled();
    expect(component.guests.length).toBe(2);
    expect(messageAddSpy).toHaveBeenCalled();
  });

  it('should getGuestInfo if user is owner', () => {
    const spy = spyOn<any>(component, 'checkAccess');
    component['getMeeting']();

    expect(component.isOwner).toBeTrue();
    expect(spy).toHaveBeenCalled();
  });

  it('should check if meetingItem exist in checkAccess', () => {
    component.meetingItem = undefined;
    component['checkAccess']();

    expect(component.meetingItem).toBeUndefined();
  });

  it('should check if meetingItem exist in getGuestInfo', () => {
    component.meetingItem = undefined;
    component['getGuestInfo']();

    expect(component.meetingItem).toBeUndefined();
  });
});

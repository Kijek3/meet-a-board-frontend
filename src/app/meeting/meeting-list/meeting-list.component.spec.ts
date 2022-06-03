import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { GameLanguage } from 'src/app/model/game.model';
import { MeetingItem } from 'src/app/model/meeting.model';
import { MeetingService } from 'src/app/service/meeting/meeting.service';
import { MeetingListItemComponent } from './meeting-list-item/meeting-list-item.component';

import { MeetingListComponent } from './meeting-list.component';

describe('MeetingListComponent', () => {
  let component: MeetingListComponent;
  let fixture: ComponentFixture<MeetingListComponent>;

  const meetingItemsMock: MeetingItem[] = [{
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
  }];

  beforeEach(async () => {
    const meetingServiceStub = jasmine.createSpyObj('MeetingService', ['getMeetings', 'getUserMeetings', 'getJoinedMeetings']);
    const messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);

    meetingServiceStub.getMeetings.and.returnValue(of(meetingItemsMock));
    meetingServiceStub.getUserMeetings.and.returnValue(of(meetingItemsMock));
    meetingServiceStub.getJoinedMeetings.and.returnValue(of(meetingItemsMock));

    await TestBed.configureTestingModule({
      declarations: [ MeetingListComponent, MeetingListItemComponent ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
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
    fixture = TestBed.createComponent(MeetingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark loading as false', () => {
    expect(component.loading).toBeFalse();
  });

  it('should set meetings arrays to meetingMock', () => {
    expect(component.meetingList).toEqual(meetingItemsMock);
    expect(component.userMeetingList).toEqual(meetingItemsMock);
    expect(component.joinedMeetingList).toEqual(meetingItemsMock);
  });
});

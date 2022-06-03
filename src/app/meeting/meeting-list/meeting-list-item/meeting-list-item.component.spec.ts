import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameLanguage } from 'src/app/model/game.model';
import { MeetingItem } from 'src/app/model/meeting.model';

import { MeetingListItemComponent } from './meeting-list-item.component';

describe('MeetingListItemComponent', () => {
  let component: MeetingListItemComponent;
  let fixture: ComponentFixture<MeetingListItemComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingListItemComponent ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingListItemComponent);
    component = fixture.componentInstance;
    component.meetingItem = meetingItemMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parseDate', () => {
    expect(component.meetingDate).toBe('14 czerwca');
  });
});

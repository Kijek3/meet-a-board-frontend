import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { of } from 'rxjs';
import { GameLanguage } from 'src/app/model/game.model';
import { MeetingItem } from 'src/app/model/meeting.model';
import { Filter, SortBy } from 'src/app/model/search.model';
import { MeetingService } from 'src/app/service/meeting/meeting.service';

import { MeetingSearchComponent } from './meeting-search.component';

describe('MeetingSearchComponent', () => {
  let component: MeetingSearchComponent;
  let fixture: ComponentFixture<MeetingSearchComponent>;

  let meetingSearchSpy: unknown;

  const meetingItemMock: MeetingItem[] = [{
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
    const meetingServiceStub = jasmine.createSpyObj('MeetingService', ['searchMeetings'], { 'searchPhrase': of('abc') });

    meetingSearchSpy = meetingServiceStub.searchMeetings.and.returnValue(of(meetingItemMock));

    await TestBed.configureTestingModule({
      declarations: [ MeetingSearchComponent ],
      imports: [
        FormsModule,
        CalendarModule,
        InputTextModule,
        DropdownModule,
        InputNumberModule,
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

  it('should call searchMeetings without filters', () => {
    const expectedFilter: Filter = {
      search: 'abc',
      minDate: undefined,
      maxDate: undefined,
      minPlayers: undefined,
      maxPlayers: undefined,
      city: undefined,
    };
    const expectedSortBy: SortBy = {};
    const expectedData = {
      filter: expectedFilter,
      sortBy: expectedSortBy,
    };

    component.search();

    expect(meetingSearchSpy).toHaveBeenCalledWith(expectedData);
  });

  it('should call searchMeetings with filters', () => {
    component.city = 'Aaa';
    component.minPlayers = 2;
    const expectedFilter: Filter = {
      search: 'abc',
      minDate: undefined,
      maxDate: undefined,
      minPlayers: 2,
      maxPlayers: undefined,
      city: 'Aaa',
    };
    const expectedSortBy: SortBy = {};
    const expectedData = {
      filter: expectedFilter,
      sortBy: expectedSortBy,
    };

    component.search();

    expect(meetingSearchSpy).toHaveBeenCalledWith(expectedData);
  });
});

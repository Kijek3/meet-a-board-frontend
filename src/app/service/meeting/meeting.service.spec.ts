import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameLanguage } from 'src/app/model/game.model';
import { MeetingItem } from 'src/app/model/meeting.model';

import { MeetingService } from './meeting.service';

describe('MeetingService', () => {
  let service: MeetingService;
  let httpTestingController: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MeetingService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make getMeetings request', (done: DoneFn) => {
    const expectedData: MeetingItem[] = meetingItemsMock;

    service.getMeetings().subscribe({
      next: (data: MeetingItem[]) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting');
    expect(req.request.method).toEqual('POST');
    req.flush(meetingItemsMock);
    expect(service).toBeTruthy();
  });

  it('should make searchMeetings request', (done: DoneFn) => {
    const expectedData: MeetingItem[] = meetingItemsMock;

    service.searchMeetings({ filter: {}, sortBy: {} }).subscribe({
      next: (data: MeetingItem[]) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting');
    expect(req.request.method).toEqual('POST');
    req.flush(meetingItemsMock);
    expect(service).toBeTruthy();
  });

  it('should make getUserMeetings request', (done: DoneFn) => {
    const expectedData: MeetingItem[] = meetingItemsMock;

    service.getUserMeetings().subscribe({
      next: (data: MeetingItem[]) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting/userMeetings');
    expect(req.request.method).toEqual('GET');
    req.flush(meetingItemsMock);
    expect(service).toBeTruthy();
  });

  it('should make getJoinedMeetings request', (done: DoneFn) => {
    const expectedData: MeetingItem[] = meetingItemsMock;

    service.getJoinedMeetings().subscribe({
      next: (data: MeetingItem[]) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting/joinedMeetings');
    expect(req.request.method).toEqual('GET');
    req.flush(meetingItemsMock);
    expect(service).toBeTruthy();
  });

  it('should make addMeeting request', (done: DoneFn) => {
    const expectedData: MeetingItem[] = meetingItemsMock;

    service.addMeeting(meetingItemsMock[0]).subscribe({
      next: (data: MeetingItem) => {
        expect(data).toEqual(expectedData[0]);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting');
    expect(req.request.method).toEqual('PUT');
    req.flush(meetingItemsMock[0]);
    expect(service).toBeTruthy();
  });

  it('should make removeMeeting request', (done: DoneFn) => {
    const expectedData: MeetingItem[] = meetingItemsMock;

    service.removeMeeting('123').subscribe({
      next: (data: MeetingItem) => {
        expect(data).toEqual(expectedData[0]);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting/123');
    expect(req.request.method).toEqual('DELETE');
    req.flush(meetingItemsMock[0]);
    expect(service).toBeTruthy();
  });

  it('should make getMeeting request', (done: DoneFn) => {
    const expectedData: MeetingItem[] = meetingItemsMock;

    service.getMeeting('123').subscribe({
      next: (data: MeetingItem) => {
        expect(data).toEqual(expectedData[0]);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting/123');
    expect(req.request.method).toEqual('GET');
    req.flush(meetingItemsMock[0]);
    expect(service).toBeTruthy();
  });

  it('should make joinMeeting request', (done: DoneFn) => {
    service.joinMeeting('123').subscribe({
      next: () => {
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting/123');
    expect(req.request.method).toEqual('POST');
    req.flush(null);
    expect(service).toBeTruthy();
  });

  it('should make acceptGuest request', (done: DoneFn) => {
    service.acceptGuest('123', '456').subscribe({
      next: () => {
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting/123/guests');
    expect(req.request.method).toEqual('PATCH');
    req.flush(null);
    expect(service).toBeTruthy();
  });

  it('should make declineGuest request', (done: DoneFn) => {
    service.declineGuest('123', '456').subscribe({
      next: () => {
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/meeting/123/guests/456');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MeetingServiceService } from './meeting-service.service';

describe('MeetingServiceService', () => {
  let service: MeetingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

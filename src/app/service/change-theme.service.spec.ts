import { TestBed } from '@angular/core/testing';

import { ChangeThemeService } from './change-theme.service';

describe('ChangeThemeService', () => {
  let service: ChangeThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

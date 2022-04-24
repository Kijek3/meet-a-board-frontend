import { TestBed } from '@angular/core/testing';

import { ChangeThemeService } from './change-theme.service';

describe('ChangeThemeService', () => {
  let service: ChangeThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeThemeService);
    service['_isLightTheme'] = true;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change theme', () => {
    service.switchTheme();

    expect(service['_isLightTheme']).toBeTrue();
  });

  it('should change theme back', () => {
    service.switchTheme();
    service.switchTheme();

    expect(service['_isLightTheme']).toBeFalse();
  });
});

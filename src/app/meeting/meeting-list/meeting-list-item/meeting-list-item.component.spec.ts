import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingListItemComponent } from './meeting-list-item.component';

describe('MeetingListItemComponent', () => {
  let component: MeetingListItemComponent;
  let fixture: ComponentFixture<MeetingListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingListItemComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

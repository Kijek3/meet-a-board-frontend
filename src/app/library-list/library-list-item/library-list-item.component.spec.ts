import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { of } from 'rxjs';
import { Game } from 'src/app/model/game.model';
import { LibraryService } from 'src/app/service/library/library.service';

import { LibraryListItemComponent } from './library-list-item.component';

describe('LibraryListItemComponent', () => {
  let component: LibraryListItemComponent;
  let fixture: ComponentFixture<LibraryListItemComponent>;

  let libraryRemoveSpy: unknown;

  const gameMock: Game = {
    id: '123456',
    title: 'Mock title',
    thumbnail: 'mockImg',
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 60,
  };

  beforeEach(async () => {
    const libraryServiceStub = jasmine.createSpyObj('LibraryService', ['removeGame']);
    const messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);

    libraryRemoveSpy = libraryServiceStub.removeGame.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      declarations: [ LibraryListItemComponent ],
      imports: [
        ButtonModule,
      ],
      providers: [
        {
          provide: LibraryService,
          useValue: libraryServiceStub,
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
    fixture = TestBed.createComponent(LibraryListItemComponent);
    component = fixture.componentInstance;
    component.game = gameMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeGame', fakeAsync(() => {
    const event = new Event('test');
    component.removeGame(event);
    
    expect(libraryRemoveSpy).toHaveBeenCalled();
  }));
});

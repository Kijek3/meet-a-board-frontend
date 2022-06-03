import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Game } from 'src/app/model/game.model';
import { LibraryItem } from 'src/app/model/library.model';

import { LibraryService } from './library.service';

describe('LibraryService', () => {
  let service: LibraryService;
  let httpTestingController: HttpTestingController;

  const gameMock: Game = {
    'id':'291794',
    'title':'Dice Throne: Season One ReRolled',
    'thumbnail':'https://cf.geekdo-images.com/EwHWnen78Ni1XiAlaD_klQ__thumb/img/ex05y12pPGTJUJ5HyOhellZvRoU=/fit-in/200x150/filters:strip_icc()/pic5944424.jpg',
    'minPlayers':2,
    'maxPlayers':6,
    'playingTime':40,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LibraryService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make addGame request', (done: DoneFn) => {
    service.addGame(gameMock).subscribe({
      next: () => {
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/library');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({ game: gameMock });
    req.flush(null);
    expect(service).toBeTruthy();
  });

  it('should make removeGame request', (done: DoneFn) => {
    service.removeGame('123').subscribe({
      next: () => {
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/library/123');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
    expect(service).toBeTruthy();
  });

  it('should make searchGame request', (done: DoneFn) => {
    service.searchGame('123').subscribe({
      next: (data: Game[]) => {
        expect(data).toEqual([gameMock]);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/library');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ query: '123' });
    req.flush([gameMock]);
    expect(service).toBeTruthy();
  });

  it('should make getLibrary request', (done: DoneFn) => {
    service.getLibrary().subscribe({
      next: (data: LibraryItem[]) => {
        expect(data).toEqual([]);
        done();
      },
    });
    const req = httpTestingController.expectOne('http://localhost:8000/library');
    expect(req.request.method).toEqual('GET');
    req.flush([]);
    expect(service).toBeTruthy();
  });

  it('should have error handler', () => {
    service['handleError']();
    expect(service).toBeTruthy();
  });
});

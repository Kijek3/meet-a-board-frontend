import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { MeetingItem } from 'src/app/model/meeting.model';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {

  constructor(
    private http: HttpClient,
  ) { }

  getMeetings(): Observable<MeetingItem[]> {
    return this.http.post<MeetingItem[]>('http://localhost:8000/meeting', {}).pipe(
      catchError(this.handleError)
    );
  }

  getMeeting(id: string): Observable<MeetingItem> {
    const meetingMock: MeetingItem = {
      _id: id,
      userId: faker.random.numeric(),
      guests: [],
      title: faker.music.songName(),
      date: faker.date.future().toString(),
      startHour: faker.date.between('2020-01-01T12:00:00.000Z', '2020-01-01T16:00:00.000Z').toLocaleTimeString('pl'),
      endHour: faker.date.between('2020-01-01T18:00:00.000Z', '2020-01-01T22:00:00.000Z').toLocaleTimeString('pl'),
      city: faker.address.cityName(),
      address: faker.address.streetAddress(),
      isInPublicPlace: faker.datatype.boolean(),
      minPlayers: faker.datatype.number({ min: 1, max: 3 }),
      maxPlayers: faker.datatype.number({ min: 4, max: 6 }),
      description: faker.commerce.productDescription(),
      game: {
        id: '1',
        title: faker.commerce.product(),
        thumbnail: faker.image.image(150, 150, true),
      },
    };
    return of(meetingMock);
    // return this.http.get<MeetingItem>(`http://localhost:8000/meeting/${id}`).pipe(
    //   catchError(this.handleError)
    // );
  }

  private handleError() {
    const errorMessage = 'Nie udało się pobrać spotkań z serwera';
    return throwError(() => new Error(errorMessage));
  }
}

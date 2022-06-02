import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MeetingItem } from 'src/app/model/meeting.model';

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

  getUserMeetings(): Observable<MeetingItem[]> {
    return this.http.get<MeetingItem[]>('http://localhost:8000/meeting/userMeetings', {}).pipe(
      catchError(this.handleError)
    );
  }

  getJoinedMeetings(): Observable<MeetingItem[]> {
    return this.http.get<MeetingItem[]>('http://localhost:8000/meeting/joinedMeetings', {}).pipe(
      catchError(this.handleError)
    );
  }
  
  addMeeting(meetingItem: MeetingItem): Observable<MeetingItem> {
    return this.http.put<MeetingItem>('http://localhost:8000/meeting', meetingItem).pipe(
      catchError(this.handleError)
    );
  }

  getMeeting(id: string): Observable<MeetingItem> {
    return this.http.get<MeetingItem>(`http://localhost:8000/meeting/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError() {
    const errorMessage = 'Nie udało się pobrać spotkań z serwera';
    return throwError(() => new Error(errorMessage));
  }
}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MeetingItem } from 'src/app/model/meeting.model';
import { Filter, SortBy } from 'src/app/model/search.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  searchPhrase = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
  ) { }

  getMeetings(): Observable<MeetingItem[]> {
    return this.http.post<MeetingItem[]>(`${environment.API_url}/meeting`, {}).pipe(
      catchError(this.handleError)
    );
  }

  searchMeetings(args: {filter: Filter, sortBy: SortBy}): Observable<MeetingItem[]> {
    return this.http.post<MeetingItem[]>(`${environment.API_url}/meeting`, args).pipe(
      catchError(this.handleError)
    );
  }

  getUserMeetings(): Observable<MeetingItem[]> {
    return this.http.get<MeetingItem[]>(`${environment.API_url}/meeting/userMeetings`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getJoinedMeetings(): Observable<MeetingItem[]> {
    return this.http.get<MeetingItem[]>(`${environment.API_url}/meeting/joinedMeetings`, {}).pipe(
      catchError(this.handleError)
    );
  }
  
  addMeeting(meetingItem: MeetingItem): Observable<MeetingItem> {
    return this.http.put<MeetingItem>(`${environment.API_url}/meeting`, meetingItem).pipe(
      catchError(this.handleError)
    );
  }

  removeMeeting(id: string): Observable<MeetingItem> {
    return this.http.delete<MeetingItem>(`${environment.API_url}/meeting/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getMeeting(id: string): Observable<MeetingItem> {
    return this.http.get<MeetingItem>(`${environment.API_url}/meeting/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  joinMeeting(id: string): Observable<void> {
    return this.http.post<void>(`${environment.API_url}/meeting/${id}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  acceptGuest(meetingId: string, userId: string): Observable<void> {
    return this.http.patch<void>(`${environment.API_url}/meeting/${meetingId}/guests`, { userId }).pipe(
      catchError(this.handleError)
    );
  }

  declineGuest(meetingId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${environment.API_url}/meeting/${meetingId}/guests/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError() {
    const errorMessage = 'Nie udało się pobrać spotkań z serwera';
    return throwError(() => new Error(errorMessage));
  }
}

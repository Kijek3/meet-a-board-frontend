import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Game } from 'src/app/model/game.model';
import { LibraryItem } from 'src/app/model/library.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {

  constructor(
    private http: HttpClient,
  ) { }

  addGame(game: Game): Observable<void> {
    return this.http.put<void>(`${environment.API_url}/library`, { game }).pipe(
      catchError(this.handleError)
    );
  }

  removeGame(gameId: string): Observable<void> {
    return this.http.delete<void>(`${environment.API_url}/library/${gameId}`).pipe(
      catchError(this.handleError)
    );
  }

  searchGame(query: string): Observable<Game[]> {
    return this.http.post<Game[]>(`${environment.API_url}/library`, { query }).pipe(
      catchError(this.handleError)
    );
  }

  getLibrary(): Observable<LibraryItem[]> {
    return this.http.get<LibraryItem[]>(`${environment.API_url}/library`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError() {
    const errorMessage = 'Nie udało się pobrać biblioteki gier';
    return throwError(() => new Error(errorMessage));
  }
}

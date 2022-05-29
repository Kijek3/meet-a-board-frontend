import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Game } from 'src/app/model/game.model';
import { LibraryItem } from 'src/app/model/library.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {

  constructor(
    private http: HttpClient,
  ) { }

  addGame(game: Game): Observable<void> {
    return this.http.put<void>('http://192.168.0.157:8000/library', { game }).pipe(
      catchError(this.handleError)
    );
  }

  removeGame(gameId: string): Observable<void> {
    return this.http.delete<void>(`http://192.168.0.157:8000/library/${gameId}`).pipe(
      catchError(this.handleError)
    );
  }

  searchGame(query: string): Observable<Game[]> {
    return this.http.post<Game[]>('http://192.168.0.157:8000/library', { query }).pipe(
      catchError(this.handleError)
    );
  }

  getLibrary(): Observable<LibraryItem[]> {
    return this.http.get<LibraryItem[]>('http://192.168.0.157:8000/library').pipe(
      catchError(this.handleError)
    );
  }

  private handleError() {
    const errorMessage = 'Nie udało się pobrać biblioteki gier';
    return throwError(() => new Error(errorMessage));
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Game } from '../model/game.model';
import { LibraryItem } from '../model/library.model';
import { LibraryService } from '../service/library/library.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss'],
})
export class LibraryListComponent implements OnInit {
  library: LibraryItem[];

  isSearchVisible = false;
  searchLoading = false;
  searchValue: string;
  searchGames: Game[] = [];

  constructor(
    private libraryService: LibraryService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getLibrary();
  }

  openSearch(): void {
    this.isSearchVisible = true;
  }

  onSearch(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchValue?.length >= 2) {
      this.searchLoading = true;
      this.libraryService.searchGame(this.searchValue).subscribe({
        next: (games: Game[]) => {
          this.searchGames = games;
          this.searchLoading = false;
        },
        error: () => {
          this.searchGames = [];
          this.searchLoading = false;
        },
      });
    }
  }

  addGame(game: Game): void {
    this.libraryService.addGame(game).subscribe(() => {
      this.isSearchVisible = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Dodano grę do biblioteki',
        detail: `${game.title} zostało dodane do biblioteki gier`,
      });
      this.getLibrary();
    });
  }

  getLibrary(): void {
    this.libraryService.getLibrary().subscribe((res: LibraryItem[]) => {
      this.library = res;
    });
  }
}

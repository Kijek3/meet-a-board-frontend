import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Game } from 'src/app/model/game.model';
import { LibraryService } from 'src/app/service/library/library.service';

@Component({
  selector: 'app-library-list-item',
  templateUrl: './library-list-item.component.html',
  styleUrls: ['./library-list-item.component.scss'],
})
export class LibraryListItemComponent {
  @Input() game: Game;
  @Output() refreshLibrary = new EventEmitter<void>();

  constructor(
    private libraryService: LibraryService,
    private messageService: MessageService,
  ) {}

  removeGame(event: Event): void {
    event.preventDefault();
    this.libraryService.removeGame(this.game.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Usunięto grę z biblioteki',
        detail: `${this.game.title} zostało usunięte z biblioteki gier`,
      });
      this.refreshLibrary.emit();
    });
  }
}

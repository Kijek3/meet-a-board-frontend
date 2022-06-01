import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Game } from '../model/game.model';
import { LibraryItem } from '../model/library.model';
import { MeetingItem } from '../model/meeting.model';
import { LibraryService } from '../service/library/library.service';
import { MeetingService } from '../service/meeting/meeting.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  loading = false;
  minDate = new Date();
  games: Game[] = [];

  constructor(
    private messageService: MessageService,
    private meetingService: MeetingService,
    private libraryService: LibraryService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  eventForm = this.formBuilder.group({
    title: ['', Validators.required],
    date: [new Date(), Validators.required],
    startHour: ['18:00', Validators.required],
    endHour: ['20:00', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    isInPublicPlace: [false, Validators.required],
    game: ['', Validators.required],
    description: [''],
    gameLanguage: ['', Validators.required],
  });

  languages = [
    { name: 'Polski' },
    { name: 'Angielski' },
    { name: 'Inny' },
  ];

  ngOnInit(): void {
    this.libraryService.getLibrary().subscribe({
      next: (library: LibraryItem[]) => {
        library.map((item) => this.games.push(item.game));
      },
    });
  }

  onAddEvent(): void {
    this.loading = true;
    this.messageService.clear();
    this.meetingService.addMeeting(this.eventForm.value).subscribe({
      next: (meeting: MeetingItem) => {
        this.loading = false;
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Dodano nowe ogłoszenie',
            detail: 'Udanego spotkania!',
          }
        );
        this.router.navigateByUrl(`/meetings/${meeting._id}`);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Nie udało się dodać ogłoszenia',
            detail: error.message,
          }
        );
      },
    });
  }
}
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MeetingService } from '../service/meeting/meeting.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
  loading = false;

  constructor(
    private messageService: MessageService,
    private meetingService: MeetingService,
    private formBuilder: FormBuilder,
  ) { }

  eventForm = this.formBuilder.group({
    title: ['', Validators.required],
    date: ['', Validators.required],
    startHour: ['', Validators.required],
    endHour: ['', Validators.required],
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

  onAddEvent(): void {
    this.loading = true;
    this.messageService.clear();
    this.meetingService.addMeeting(this.eventForm.value).subscribe({
      next: () => {
        this.loading = false;
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
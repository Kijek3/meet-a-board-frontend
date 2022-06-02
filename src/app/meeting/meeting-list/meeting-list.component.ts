import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MeetingItem } from 'src/app/model/meeting.model';
import { MeetingService } from 'src/app/service/meeting/meeting.service';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit {
  loading = true;
  meetingList: MeetingItem[];
  userMeetingList: MeetingItem[];
  joinedMeetingList: MeetingItem[];
  mockListFaker: MeetingItem[] = [];

  constructor(
    private meetingService: MeetingService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getMeetings();
    this.getUserMeetings();
    this.getJoinedMeetings();
  }

  private getMeetings(): void {
    this.loading = true;
    this.meetingService.getMeetings().subscribe({
      next: (meetings: MeetingItem[]) => {
        this.meetingList = meetings;
        this.loading = false;
      },
      error: (error: Error) => {
        this.loading = false;
        this.meetingList = this.mockListFaker;
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Błąd',
            detail: error.message,
          }
        );
      },
    });
  }

  private getUserMeetings(): void {
    this.loading = true;
    this.meetingService.getUserMeetings().subscribe({
      next: (meetings: MeetingItem[]) => {
        this.userMeetingList = meetings;
        this.loading = false;
      },
      error: (error: Error) => {
        this.loading = false;
        this.meetingList = this.mockListFaker;
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Błąd',
            detail: error.message,
          }
        );
      },
    });
  }

  private getJoinedMeetings(): void {
    this.loading = true;
    this.meetingService.getJoinedMeetings().subscribe({
      next: (meetings: MeetingItem[]) => {
        this.joinedMeetingList = meetings;
        this.loading = false;
      },
      error: (error: Error) => {
        this.loading = false;
        this.meetingList = this.mockListFaker;
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Błąd',
            detail: error.message,
          }
        );
      },
    });
  }
}

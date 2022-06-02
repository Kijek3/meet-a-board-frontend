import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingItem } from 'src/app/model/meeting.model';
import { MeetingService } from 'src/app/service/meeting/meeting.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
  meetingItem: MeetingItem;
  meetingDate: string;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService,
  ) {}

  ngOnInit(): void {
    this.getMeeting();
  }

  private getMeeting(): void {
    this.meetingService.getMeeting(this.route.snapshot.paramMap.get('id')).subscribe((meeting: MeetingItem) => {
      this.meetingItem = meeting;
      this.parseDate();
    });
  }

  private parseDate(): void {
    this.meetingDate = new Date(this.meetingItem.date).toLocaleDateString('pl', { day: 'numeric', month: 'long' });
  }

  openGame(s: string) {
    window.location.href=(`https://gameboardgeek.com/boardgame/${s}`);
  }
}

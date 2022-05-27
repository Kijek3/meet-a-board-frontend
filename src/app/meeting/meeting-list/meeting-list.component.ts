import { Component, OnInit } from '@angular/core';
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

  constructor(
    private meetingService: MeetingService,
  ) {}

  ngOnInit(): void {
    this.getMeetings();
  }

  private getMeetings(): void {
    console.log(':)');
  }

}

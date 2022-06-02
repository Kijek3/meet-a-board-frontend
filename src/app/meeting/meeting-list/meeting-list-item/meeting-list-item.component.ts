import { Component, Input, OnInit } from '@angular/core';
import { MeetingItem } from 'src/app/model/meeting.model';

@Component({
  selector: 'app-meeting-list-item',
  templateUrl: './meeting-list-item.component.html',
  styleUrls: ['./meeting-list-item.component.scss'],
})
export class MeetingListItemComponent implements OnInit {
  @Input() meetingItem: MeetingItem;
  meetingDate: string;

  ngOnInit(): void {
    this.parseDate();
  }

  parseDate(): void {
    this.meetingDate = new Date(this.meetingItem.date).toLocaleDateString('pl', { day: 'numeric', month: 'long' });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MeetingItem } from 'src/app/model/meeting.model';

@Component({
  selector: 'app-meeting-list-item',
  templateUrl: './meeting-list-item.component.html',
  styleUrls: ['./meeting-list-item.component.scss'],
})
export class MeetingListItemComponent implements OnInit {
  @Input() meetingItem: MeetingItem;

  ngOnInit(): void {
    console.log(this.meetingItem);
  }
}

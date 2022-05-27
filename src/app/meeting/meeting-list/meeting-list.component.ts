import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit {
  loading = true;

  ngOnInit(): void {
    this.getMeetings();
  }

  private getMeetings(): void {
    console.log(':)');
  }

}

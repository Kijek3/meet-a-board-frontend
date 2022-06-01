import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MeetingItem } from 'src/app/model/meeting.model';
import { MeetingService } from 'src/app/service/meeting/meeting.service';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit {
  loading = true;
  meetingList: MeetingItem[];
  userMeetingList: MeetingItem[];
  mockListFaker: MeetingItem[] = [];

  constructor(
    private meetingService: MeetingService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      const meetingMock: MeetingItem = {
        _id: i.toString(),
        userId: faker.random.numeric(),
        guests: [],
        title: faker.music.songName(),
        date: faker.date.future().toString(),
        startHour: faker.date.between('2020-01-01T12:00:00.000Z', '2020-01-01T16:00:00.000Z').toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' }),
        endHour: faker.date.between('2020-01-01T18:00:00.000Z', '2020-01-01T22:00:00.000Z').toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' }),
        city: faker.address.cityName(),
        address: faker.address.streetAddress(),
        isInPublicPlace: faker.datatype.boolean(),
        minPlayers: faker.datatype.number({ min: 1, max: 3 }),
        maxPlayers: faker.datatype.number({ min: 4, max: 6 }),
        description: faker.commerce.productDescription(),
        game: {
          id: '1',
          title: faker.commerce.product(),
          thumbnail: faker.image.cats(150, 150, true),
        },
      };
      this.mockListFaker.push(meetingMock);
    }
    this.getMeetings();
    this.getUserMeetings();
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

}

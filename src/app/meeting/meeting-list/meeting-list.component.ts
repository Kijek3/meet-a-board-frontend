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
  mockList: MeetingItem[] = [
    {
      id: '1',
      userId: '123',
      guests: [],
      title: 'Rozgrywki królów',
      date: '2011-10-05',
      startHour: '16:00',
      endHour: '18:00',
      city: 'Kraków',
      address: 'Hex',
      isInPublicPlace: true,
      game: {
        title: 'Splendor',
        thumbnail: 'https://glamrap.pl/wp-content/uploads/2022/05/sentino-3.jpg',
      },
    },
    {
      id: '2',
      userId: '456',
      guests: [],
      title: 'Chodźmy pod witraż',
      date: '2021-09-14',
      startHour: '17:00',
      endHour: '19:00',
      city: 'Poznań',
      address: 'Miasto doznań',
      isInPublicPlace: false,
      game: {
        title: 'Sagrada',
        thumbnail: 'https://cf.geekdo-images.com/PZt3EAAGV3dFIVuwMR0AEw__thumb/img/1m4aryOW1MOpq-8jGkF6gDTJmCY=/fit-in/200x150/filters:strip_icc()/pic3525224.jpg',
      },
    },
    {
      id: '2',
      userId: '456',
      guests: [],
      title: 'Chodźmy pod witraż',
      date: '2021-09-14',
      startHour: '17:00',
      endHour: '19:00',
      city: 'Poznań',
      address: 'Miasto doznań',
      isInPublicPlace: false,
      game: {
        title: 'Sagrada',
        thumbnail: 'https://cf.geekdo-images.com/PZt3EAAGV3dFIVuwMR0AEw__thumb/img/1m4aryOW1MOpq-8jGkF6gDTJmCY=/fit-in/200x150/filters:strip_icc()/pic3525224.jpg',
      },
    },
    {
      id: '2',
      userId: '456',
      guests: [],
      title: 'Przeklęta wyspa',
      date: '2021-09-14',
      startHour: '17:00',
      endHour: '19:00',
      city: 'Poznań',
      address: 'Miasto doznań',
      isInPublicPlace: false,
      game: {
        title: 'Robinson Crusoe',
        thumbnail: 'https://cf.geekdo-images.com/FbFnaTx3aT5dM18K_bR_Pg__thumb/img/K1ZUx-QNGg-Kkm2D9iUX4bL0-IM=/fit-in/200x150/filters:strip_icc()/pic3165731.jpg',
      },
    },
    {
      id: '2',
      userId: '456',
      guests: [],
      title: 'Chodźmy pod witraż',
      date: '2021-09-14',
      startHour: '17:00',
      endHour: '19:00',
      city: 'Poznań',
      address: 'Miasto doznań',
      isInPublicPlace: false,
      game: {
        title: 'Sagrada',
        thumbnail: 'https://cf.geekdo-images.com/PZt3EAAGV3dFIVuwMR0AEw__thumb/img/1m4aryOW1MOpq-8jGkF6gDTJmCY=/fit-in/200x150/filters:strip_icc()/pic3525224.jpg',
      },
    },
    {
      id: '2',
      userId: '456',
      guests: [],
      title: 'Chodźmy pod witraż',
      date: '2021-09-14',
      startHour: '17:00',
      endHour: '19:00',
      city: 'Poznań',
      address: 'Miasto doznań',
      isInPublicPlace: false,
      game: {
        title: 'Sagrada',
        thumbnail: 'https://cf.geekdo-images.com/PZt3EAAGV3dFIVuwMR0AEw__thumb/img/1m4aryOW1MOpq-8jGkF6gDTJmCY=/fit-in/200x150/filters:strip_icc()/pic3525224.jpg',
      },
    },
  ];

  constructor(
    private meetingService: MeetingService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getMeetings();
  }

  private getMeetings(): void {
    this.meetingService.getMeetings().subscribe({
      next: (meetings: MeetingItem[]) => {
        this.meetingList = meetings;
        this.loading = false;
      },
      error: (error: Error) => {
        this.loading = false;
        this.meetingList = this.mockList;
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

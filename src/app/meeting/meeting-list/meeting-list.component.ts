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
      minPlayers: 2,
      maxPlayers: 4,
      description: 'Vestibulum id elit porta, ullamcorper velit eu, dignissim diam. Etiam ultrices, magna eu interdum iaculis, lectus tellus semper sapien, eget hendrerit tortor orci sed nibh. Quisque porttitor finibus dolor vitae mattis. Nunc sollicitudin neque viverra orci commodo, sed hendrerit enim feugiat. Maecenas at porttitor justo, at pulvinar dui. Donec et tellus ac metus tincidunt fringilla non sit amet quam. Vivamus aliquet ligula dolor, non rhoncus arcu lobortis pretium. Nunc neque dui, accumsan nec ligula maximus, sodales ullamcorper nunc. Nulla ut tincidunt dui. Aenean rutrum at tortor eget blandit. Donec varius vitae nulla vitae venenatis. Morbi arcu leo, iaculis sit amet ipsum ut, fringilla gravida massa. Morbi fermentum sem non elementum pellentesque.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget tincidunt lorem. Fusce sit amet porta mauris. Aliquam hendrerit nibh sed ante congue convallis. Morbi tincidunt odio lorem, non elementum est viverra nec. Quisque ac arcu nec tortor efficitur semper. Quisque a luctus erat, in pretium urna. Duis vitae leo placerat, porta nunc ac, bibendum elit. Sed finibus turpis in augue gravida tincidunt. Cras non tempus ex. Vestibulum semper, tellus pellentesque laoreet mollis, augue ex convallis ex, eu tincidunt velit magna quis felis. Nulla facilisi. Pellentesque ligula sapien, porta id dignissim ac, bibendum vitae libero. Phasellus pharetra augue ut risus fringilla fringilla. Fusce eu nunc posuere, facilisis sapien eget, tempus sapien. Aenean scelerisque massa ac sapien tincidunt iaculis. Pellentesque ut magna sit amet enim semper hendrerit. ',
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

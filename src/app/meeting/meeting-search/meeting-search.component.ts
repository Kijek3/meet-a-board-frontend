import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MeetingItem } from 'src/app/model/meeting.model';
import { Filter, SortBy } from 'src/app/model/search.model';
import { MeetingService } from 'src/app/service/meeting/meeting.service';

@Component({
  selector: 'app-meeting-search',
  templateUrl: './meeting-search.component.html',
  styleUrls: ['./meeting-search.component.scss'],
})
export class MeetingSearchComponent implements OnInit, OnDestroy {
  meetingList: MeetingItem[];
  loading = false;
  searchSubscription: Subscription;

  searchValue: string;
  minPlayers: number;
  maxPlayers: number;
  minDate: string;
  maxDate: string;
  city: string;
  
  sortChoice: SortBy;
  sortOptions: SortBy[] = [
    {
      name: 'Data wydarzenia (rosnąco)',
      field: 'date',
      asc: true,
    },
    {
      name: 'Data wydarzenia (malejąco)',
      field: 'date',
      asc: false,
    },
    {
      name: 'Tytuł gry (rosnąco)',
      field: 'game.title',
      asc: true,
    },
    {
      name: 'Tytuł gry (malejąco)',
      field: 'game.title',
      asc: false,
    },
  ];

  constructor(
    private meetingService: MeetingService,
  ) { }

  ngOnInit(): void {
    this.searchSubscription = this.meetingService.searchPhrase.subscribe((search: string) => {
      this.searchValue = search;
      this.search();
    });
    this.search();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  search(): void {
    this.loading = true;
    const filter: Filter = {
      search: this.searchValue,
      minPlayers: this.minPlayers,
      maxPlayers: this.maxPlayers,
      minDate: this.minDate,
      maxDate: this.maxDate,
      city: this.city,
    };
    const sortBy: SortBy = { ...this.sortChoice };

    const data = {
      filter: filter,
      sortBy: sortBy,
    };
    this.meetingService.searchMeetings(data).subscribe({
      next: (meetings: MeetingItem[]) => {
        this.meetingList = meetings;
        this.loading = false;
      },
    });
  }
}

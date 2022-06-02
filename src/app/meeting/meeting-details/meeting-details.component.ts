import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MeetingItem } from 'src/app/model/meeting.model';
import { UserInfo } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MeetingService } from 'src/app/service/meeting/meeting.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
  meetingItem: MeetingItem;
  isOwner = false;
  isAcceptedGuest = false;
  guests: UserInfo[] = [];
  meetingDate: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private meetingService: MeetingService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getMeeting();
  }

  joinMeeting(): void {
    this.meetingService.joinMeeting(this.meetingItem._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Twoja kandydatura została dodana',
          detail: 'Usiądź wygodnie i poczekaj aż autor ogłoszenia Cię zaakceptuje',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Twoja kandydatura jest rozpatrywana',
          detail: 'Usiądź wygodnie i poczekaj aż autor ogłoszenia Cię zaakceptuje',
        });
      },
    });
  }

  removeMeeting(): void {
    this.meetingService.removeMeeting(this.meetingItem._id).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
    });
  }

  acceptGuest(guest: UserInfo): void {
    this.meetingService.acceptGuest(this.meetingItem._id, guest.user.userId).subscribe({
      next: () => {
        this.guests.map((guestInfo) => {
          if (guestInfo.user.userId === guest.user.userId) {
            guestInfo.user.isAccepted = true;
          }
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Zaakceptowano zaproszenie',
          detail: `${guest.firstName} ${guest.lastName} weźmie udział w spotkaniu C:`,
        });
      },
    });
  }

  declineGuest(guest: UserInfo): void {
    this.meetingService.declineGuest(this.meetingItem._id, guest.user.userId).subscribe({
      next: () => {
        this.guests = this.guests.filter((guestInfo) => guestInfo.user.userId !== guest.user.userId);
        this.messageService.add({
          severity: 'info',
          summary: 'Odrzucono zaproszenie',
          detail: `${guest.firstName} ${guest.lastName} nie weźmie udziału w spotkaniu :C`,
        });
      },
    });
  }

  private getMeeting(): void {
    this.meetingService.getMeeting(this.route.snapshot.paramMap.get('id')).subscribe((meeting: MeetingItem) => {
      this.meetingItem = meeting;
      this.parseDate();
      this.checkAccess();
      if (this.isOwner || this.isAcceptedGuest) {
        this.getGuestInfo();
      }
    });
  }

  private checkAccess(): void {
    if (this.meetingItem.userId === this.authService.userId) {
      this.isOwner = true;
    }
    this.meetingItem?.guests?.forEach(guest => {
      if (guest.userId === this.authService.userId && guest.isAccepted) {
        this.isAcceptedGuest = true;
      }
    });
  }

  private getGuestInfo(): void {
    this.meetingItem?.guests?.forEach(guest => {
      this.authService.getUserInfo(guest.userId).subscribe((guestInfo) => {
        this.guests.push({
          ...guestInfo,
          user: { ...guest },
        });
      });
    });
  }

  private parseDate(): void {
    this.meetingDate = new Date(this.meetingItem.date).toLocaleDateString('pl', { day: 'numeric', month: 'long' });
  }

  openGame(s: string) {
    window.location.href=(`https://gameboardgeek.com/boardgame/${s}`);
  }
}

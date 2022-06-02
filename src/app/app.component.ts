import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from './service/auth/auth.service';
import { ChangeThemeService } from './service/change-theme/change-theme.service';
import { MeetingService } from './service/meeting/meeting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MessageService ],
})
export class AppComponent implements OnInit {
  isLightTheme = true;
  searchValue: string;
  userLogged: boolean;
  menuItems: MenuItem[] = [
    {
      label: 'Dodaj',
      icon: 'pi pi-plus',
      routerLink: '/meetings/new',
    },
    {
      label: 'Biblioteka',
      icon: 'pi pi-book',
      routerLink: '/library',
    },
    {
      label: 'Profil',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Ustawienia',
          icon: 'pi pi-cog',
          routerLink: '/settings',
        },
        {
          label: 'Tryb nocny',
          icon: 'pi pi-moon',
          command: () => {
            this.switchTheme();
          },
        },
        {
          label: 'Wyloguj się',
          icon: 'pi pi-power-off',
          command: () => {
            this.logout();
          },
        },
      ],
    },
  ];

  translation = {
    'accept': 'Tak',
    'reject': 'Nie',
    'choose': 'Wybierz',
    'upload': 'Wyślij',
    'cancel': 'Anuluj',
    'dayNames': ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    'dayNamesShort': ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
    'dayNamesMin': ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
    'monthNames': ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    'monthNamesShort': ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'],
    'today': 'Dziś',
    'clear': 'Wyczyść',
    'weekHeader': 'tydz.',
    'firstDayOfWeek': 0,
    'dateFormat': 'dd/mm/yy',
    'weak': 'Słaby',
    'medium': 'Umiarkowany',
    'strong': 'Silny',
    'passwordPrompt': 'Podaj hasło',
  };

  constructor(
    private authService: AuthService,
    private changeThemeService: ChangeThemeService,
    private messageService: MessageService,
    private meetingService: MeetingService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
  ) {
    this.isLightTheme = changeThemeService.isLightTheme;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation(this.translation);
    this.authService.checkToken();
    this.authService.userLoggedIn.subscribe((value) => {
      this.userLogged = value;
      if (!this.userLogged) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  switchTheme(): void {
    this.changeThemeService.switchTheme();
    this.isLightTheme = !this.isLightTheme;
  }

  onClick(): void {
    this.router.navigateByUrl('/meetings/search');
  }

  onChange(): void {
    this.meetingService.searchPhrase.emit(this.searchValue);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.messageService.add({
      severity: 'success',
      summary: 'Pomyślnie wylogowano',
      detail: 'Do zobaczenia później!',
    });
  }
}
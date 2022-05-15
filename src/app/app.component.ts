import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from './service/auth/auth.service';
import { ChangeThemeService } from './service/change-theme/change-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MessageService ],
})
export class AppComponent implements OnInit {
  isLightTheme: boolean;
  searchValue: string;
  userLogged: boolean;

  constructor(
    private authService: AuthService,
    private changeThemeService: ChangeThemeService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
  ) {
    this.isLightTheme = changeThemeService.isLightTheme;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.authService.checkToken();
    this.authService.userLoggedIn.subscribe((value) => {
      this.userLogged = value;
    });
  }

  switchTheme(): void {
    this.changeThemeService.switchTheme();
    this.isLightTheme = !this.isLightTheme;
  }

  onSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      console.log(this.searchValue);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.messageService.add({
      severity: 'success',
      summary: 'Pomyślnie wylogowano',
      detail: 'Do zobaczenia później!',
    });
  }
}

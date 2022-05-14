import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ChangeThemeService } from './service/change-theme/change-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MessageService ],
})
export class AppComponent implements OnInit {
  isLightTheme: boolean;

  constructor(
    private primengConfig: PrimeNGConfig,
    private changeThemeService: ChangeThemeService,
  ) {
    this.isLightTheme = changeThemeService.isLightTheme;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  switchTheme(): void {
    this.changeThemeService.switchTheme();
    this.isLightTheme = !this.isLightTheme;
  }
}

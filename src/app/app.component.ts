import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api'
import { ChangeThemeService } from './service/change-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

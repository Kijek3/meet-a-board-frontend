import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {
  private isDark = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  switchTheme() {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `lara-${this.isDark ? 'light' : 'dark'}.css`
    }
    this.isDark = !this.isDark;
  }
}

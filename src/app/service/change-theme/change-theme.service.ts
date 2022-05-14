import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {
  private _isLightTheme = true;
  get isLightTheme(): boolean {
    return this._isLightTheme;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { 
    this.setTheme();
  }

  switchTheme(): void {
    this._isLightTheme = !this._isLightTheme;
    this.setTheme();
  }

  setTheme() {
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `lara-${this._isLightTheme ? 'light' : 'dark'}.css`;
    }
  }
}

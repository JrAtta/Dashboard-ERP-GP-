import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeSubject = new BehaviorSubject<string>('dark');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    // تحميل الثيم المحفوظ من localStorage عند بدء التطبيق
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
  }

  toggleTheme() {
    const currentTheme = this.themeSubject.value;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // حفظ الثيم
  }

  getCurrentTheme(): string {
    return this.themeSubject.value;
  }
}

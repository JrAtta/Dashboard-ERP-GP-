import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { EvaIconService } from '../../services/eva-icon.service';
import {  FormsModule } from '@angular/forms';
import { SearchDataService } from '../../services/search-data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit  {
  currentTheme: string = 'dark';
  constructor(private themeService: ThemeService, private _EvaIconService: EvaIconService,private _searchService:SearchDataService){}

  ngOnInit() {
    // الاشتراك في تغييرات الثيم
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }



toggleTheme() {
  window.location.reload();
    this._EvaIconService.initializeEvaIcons();
    this.themeService.toggleTheme();
  }

  onSearch(event:Event){
    const searhValue = (event.target as HTMLInputElement).value;  // من غير .value  انا كدا ماسك ال input نفسه
    this._searchService.updateSearchValue(searhValue);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  constructor() { }

  private searchSubject = new BehaviorSubject<string>('');

  searchValue$ = this.searchSubject.asObservable();

  updateSearchValue(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

}

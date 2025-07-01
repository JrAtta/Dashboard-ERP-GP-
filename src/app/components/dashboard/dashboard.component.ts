import { Component, OnInit } from '@angular/core';
import { ICard } from '../../interfaces/Icard';
import { ChartsComponent } from "../charts/charts.component";
import { CountUpModule } from 'ngx-countup';
import { TotalChartsComponent } from "../total-charts/total-charts.component";
import { OrdersTableComponent } from "../orders-table/orders-table.component";
import { CardDataService } from '../../services/card-data.service';
import { SearchDataService } from '../../services/search-data.service';
import { SearchPipe } from '../../pipe/search.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ChartsComponent, CountUpModule, TotalChartsComponent, OrdersTableComponent,SearchPipe, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  searchValue: string = '';
  cardData:ICard[] = [] ;

  constructor(private _cardData:CardDataService, private _searchService:SearchDataService){}
  ngOnInit(): void {
    this.cardData = this._cardData.cardData // push data from service
    this.cardData.forEach(card => {
      card.change = (card.value - card.previous) / card.previous
    })
    this._searchService.searchValue$.subscribe(searchValue => this.searchValue = searchValue);
  }
}

import { Component, OnInit, Inject, inject } from '@angular/core';
import { Iorder } from '../../interfaces/iorder';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchDataService } from '../../services/search-data.service';
import { SearchPipe } from '../../pipe/search.pipe';
import { RecentOrdersService } from '../../services/recent-orders.service';

@Component({
  selector: 'app-orders-table',
  imports: [
    NgClass,
    CurrencyPipe,
    NgIf,
    NgFor,
    FormsModule,
    SearchPipe
  ],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})
export class OrdersTableComponent implements OnInit {

  searchValue: string = '';

    sortColumn: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
    limit: number | 'All' = 5;
    optionsLimit: (number | 'All')[] = [5, 10, 20, 'All'];
    displayOrders: Iorder[] = [];

    constructor(private _searchService: SearchDataService, private _orders:RecentOrdersService) {}

    setLimit(limit: number | 'All') {
      if (limit === 'All') {
        this.displayOrders = [...this.recentOrders];
      } else {
        this.displayOrders = this.recentOrders.slice(0, limit);
      }
    }

    recentOrders: Iorder[] =[]

    sortData(column: any) {
      if (this.sortColumn === column) {
        // لو ضغطت على نفس العمود، اقلب الاتجاه
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // لو عمود جديد، خليه تصاعدي افتراضيًا
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }

      this.displayOrders.sort((a: any, b: any) => {
        const valueA = a[column];
        const valueB = b[column];

        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    ngOnInit(): void {

      this.recentOrders = this._orders.recentOrders
      this.setLimit(this.limit);
      this.sortData(this.sortColumn);

      this._searchService.searchValue$.subscribe((value) => {
        this.searchValue = value;
      })
    }
}

import { Component, OnInit, Inject, inject } from '@angular/core';
import { Iorder } from '../../interfaces/iorder';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchDataService } from '../../services/search-data.service';
import { SearchPipe } from '../../pipe/search.pipe';

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

    constructor(private _searchService: SearchDataService) {}

    setLimit(limit: number | 'All') {
      if (limit === 'All') {
        this.displayOrders = [...this.recentOrders];
      } else {
        this.displayOrders = this.recentOrders.slice(0, limit);
      }
    }

    recentOrders: Iorder[] = [
      {
        date: '08/02/2023',
        orderId: 'ORD-001',
        customer: 'John Doe',
        value: 1500,
        status: 'Completed',
      },
      {
        date: '09/02/2023',
        orderId: 'ORD-002',
        customer: 'Jane Smith',
        value: 2200,
        status: 'Pending',
      },
      {
        date: '10/02/2023',
        orderId: 'ORD-003',
        customer: 'Alex Brown',
        value: 1800,
        status: 'Cancelled',
      },
      {
        date: '11/02/2023',
        orderId: 'ORD-004',
        customer: 'Emily White',
        value: 1950,
        status: 'Completed',
      },
      {
        date: '12/02/2023',
        orderId: 'ORD-005',
        customer: 'Michael Green',
        value: 2100,
        status: 'Pending',
      },
      {
        date: '13/02/2023',
        orderId: 'ORD-006',
        customer: 'Laura Black',
        value: 2750,
        status: 'Completed',
      },
      {
        date: '14/02/2023',
        orderId: 'ORD-007',
        customer: 'Chris Blue',
        value: 1600,
        status: 'Cancelled',
      },
      {
        date: '15/02/2023',
        orderId: 'ORD-008',
        customer: 'Sophie Grey',
        value: 2400,
        status: 'Pending',
      },
      {
        date: '16/02/2023',
        orderId: 'ORD-009',
        customer: 'Daniel King',
        value: 3000,
        status: 'Completed',
      },
      {
        date: '17/02/2023',
        orderId: 'ORD-010',
        customer: 'Olivia Rose',
        value: 1850,
        status: 'Completed',
      },
    ];

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
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
       this.setLimit(this.limit);
      this.sortData(this.sortColumn);

      this._searchService.searchValue$.subscribe((value) => {
        this.searchValue = value;
      })
    }
}

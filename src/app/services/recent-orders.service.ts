import { Injectable } from '@angular/core';
import { Iorder } from '../interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class RecentOrdersService {

  constructor() { }

  recentOrders:Iorder[] =  [
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
        value: 3500,
        status: 'Pending',
      },
      {
        date: '10/02/2023',
        orderId: 'ORD-003',
        customer: 'Alex Brown',
        value: 2200,
        status: 'Cancelled',
      },
      {
        date: '11/02/2023',
        orderId: 'ORD-004',
        customer: 'Emily White',
        value: 4550,
        status: 'Completed',
      },
      {
        date: '12/02/2023',
        orderId: 'ORD-005',
        customer: 'Michael Green',
        value: 6100,
        status: 'Pending',
      },
      {
        date: '13/02/2023',
        orderId: 'ORD-006',
        customer: 'Laura Black',
        value: 8750,
        status: 'Completed',
      },

      {
        date: '14/02/2023',
        orderId: 'ORD-007',
        customer: 'Chris Blue',
        value: 5600,
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
        value: 7650,
        status: 'Completed',
      },
    ];
}

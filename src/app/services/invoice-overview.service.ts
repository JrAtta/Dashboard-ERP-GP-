import { Injectable } from '@angular/core';
import { InvoiceOverview } from '../interfaces/invoice-overview';

@Injectable({
  providedIn: 'root'
})
export class InvoiceOverviewService {

  constructor() { }

  invoiceOverview : InvoiceOverview[] = [
    {
      status: "Overdue",
      count: 3,
      total: 9500,
      percent:18.18,
      color:'#5522C1'
    },
    {
      status: "Not Paid",
      count: 4,
      total: 12000,
      percent:24.24,
      color:'#912f56'
    },
    {
      status: "Partially Paid",
      count: 2,
      total: 6000,
      percent:12.12,
      color:'#2B8FE7',
      paid:4000,
      unPaid:2000
    },
    {
      status: "Fully Paid",
      count: 5,
      total: 18000,
      percent:36.36,
      color:'#60D479'
    },
    {
      status: "Draft",
      count: 3,
      total: 4500,
      percent:9.09,
      color:'#FFA53E'
    }
  ];

   getTotalInvoices() {
     const totalPaid = this.invoiceOverview.reduce((sum, item) => {
  if (item.status === 'Fully Paid') return sum + item.total;
  if (item.status === 'Partially Paid') return sum + (item.paid ?? 0);
  return sum;
  }, 0);
      const overdue = this.invoiceOverview.find(item=> item.status === 'Overdue')?.total || 0 ;
      const notPaid = this.invoiceOverview.reduce((sum, item) => {
        if (item.status === 'Not Paid') return sum + item.total;
        if (item.status === 'Partially Paid') return sum + (item.unPaid ?? 0);
        return sum ;
      },0);

      return{
      totalPaid,
      overdue,
      notPaid,

    }

  }


}

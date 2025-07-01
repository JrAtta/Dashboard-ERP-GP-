import { Component, HostListener, OnInit } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { RecentOrdersService } from '../../services/recent-orders.service';

@Component({
  selector: 'app-customer-expenses',
  imports: [PlotlyModule],
  templateUrl: './customer-expenses.component.html',
  styleUrl: './customer-expenses.component.scss'
})
export class CustomerExpensesComponent  implements OnInit{
  root = document.documentElement;
  bgCard = getComputedStyle(this.root).getPropertyValue('--bg-card').trim();
  mainColor = getComputedStyle(this.root)
    .getPropertyValue('--main-color')
    .trim();

  customerData: any;
  customerLayout: any;
  expensesData: any;
  expensesLayout: any;
  config: any;
  isSmallScreen: boolean = false;
  customerSummary : any = {}


  constructor(private _orders: RecentOrdersService) {}

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 480;
    this.updateChart();
  }

  ngOnInit() {


    this.onResize(null); // فحص العرض عند التحميل
    this.updateChart();

    this.config = {
      responsive: true,
      displayModeBar: false,
    };
  }


  updateChart() {

 const customersData:any[] = []

    this._orders.recentOrders.forEach (order =>{
      this.customerSummary =
      {
        customer: order.customer,
        total: order.value * 10    // mock data
      }
      customersData.push(this.customerSummary)

    });

    // Customer Sales Scatter Plot
    const orderSize: number[] = [];
    const orders = [5, 12, 8, 15, 20, 25, 18, 10, 7, 22];
    orders.forEach((order) => {
      order = order * 3;
      orderSize.push(order);
    });
    this.customerData = [
      {
        x: orders,
        y: customersData.map( customer => customer.total ),
        type: 'scatter',
        mode: 'markers',
        text: customersData.map(customer => customer.customer),
        marker: {
          color: [
            '#5522C1',
            '#912F56',
            '#FF6B6B',
            '#45B75E',
            '#4ECDC4',
            '#2B8FE7',
            '#FFA53E',
            '#6EC9FD',
            '#9B59B6',
            '#60D479',
          ],

          size: orderSize,
          line: {
            color: this.bgCard,
            width: 2,
          },
        },
        hovertemplate:
          `<b>%{text}</b><br>Orders: %{x}<br>Revenue: $%{y:,.0f}<extra></extra>`,
      },
    ];

    this.customerLayout = {
      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,
      xaxis: {
        title: 'Number of Orders',
        showgrid: false,
      },
      yaxis: {
        title: 'Total Revenue ($)',
        range: [0, 100000],
        zeroline: false,
      },
      margin: { t: 60, b: 40, l: 40, r: 0 },
      font: { color: this.mainColor, weight: 500, family: 'Inter, sans-serif' },
    };




    //  Expenses Breakdown Pie Chart
    this.expensesData = [
      {
        values: [25000, 18000, 15000, 12000, 8000, 6000],
        labels: [
          'Salaries',
          'Rent',
          'Utilities',
          'Marketing',
          'Equipment',
          'Others',
        ],
        type: 'pie',
        marker: {
          // colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
          colors: [
            '#5522C1',
            '#2B8FE7',
            '#FFA53E',
            '#6EC9FD',
            '#9B59B6',
            '#60D479',
          ],
          line: {
            color: this.bgCard,
            width: 1,
            opacity: 0.6,
          },
        },
        textinfo: 'label+value',
        textposition: 'auto',
        hovertemplate:
          '<b>%{label}</b><br>Amount: $%{value:,.0f}<br>Percentage: %{percent}<extra></extra>',
      },
    ];

    this.expensesLayout = {
      responsive: true,
      autosize: true,
      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,

      font: { color: this.mainColor, family: 'Inter, sans-serif' },
      align: 'center',
      showlegend: this.isSmallScreen ? false : true,
      legend: {
        orientation: window.innerWidth < 550 ? 'h' : 'v',
        x: window.innerWidth < 550 ? 0.16 : 1,
        y: window.innerWidth < 550 ? -0.1 : 0.5,

        font: { color: this.mainColor },
        bgcolor: 'transparent',
        align: 'center',
      },
      height: this.isSmallScreen ? 300 : 400,
      margin: {
        t: this.isSmallScreen ? 20 : 60,
        b: this.isSmallScreen ? 20 : 60,
        l: this.isSmallScreen ? 20 : 0,
        r: this.isSmallScreen ? 20 : 0,
      },
    };
  }
}

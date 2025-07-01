import { Component, HostListener, OnInit } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { InvoiceOverview } from '../../interfaces/invoice-overview';
import { InvoiceOverviewService } from '../../services/invoice-overview.service';

@Component({
  selector: 'app-invoices-cashflow',
  imports: [PlotlyModule],
  templateUrl: './invoices-cashflow.component.html',
  styleUrl: './invoices-cashflow.component.scss',
})
export class InvoicesCashflowComponent implements OnInit {
  root = document.documentElement;
  bgCard = getComputedStyle(this.root).getPropertyValue('--bg-card').trim();
  mainColor = getComputedStyle(this.root)
    .getPropertyValue('--main-color')
    .trim();

  pieData: any;
  pieLayout: any;
  barData: any;
  barLayout: any;
  config: any;
  totalPaid!: number;
  overdue!: number;
  notPaid!: number;
  isSmallScreen: boolean = false;
  constructor(private _invoices: InvoiceOverviewService) {}


  invoiceOverview: InvoiceOverview[] = [];
  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 480;
    // this.ngOnInit();
    this.updateChart();
  }
  ngOnInit(): void {
    this.invoiceOverview = this._invoices.invoiceOverview;
    this.onResize(null);
    this.updateChart();
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
    const Income = {
      x: months,
      y: [100, 200, 300, 280, 100, 50, 220, 260, 70, 90, 110, 120], // Earning (تقريبي)
      name: 'Income',
      type: 'bar',
      marker: {
        color: '#60D479', // اللون الأزرق
      },
      opacity: 0.8,
      base: 10,
    };

    const Expenses = {
      x: months,
      y: [-150, -80, -40, -200, -100, -50, -100, -70, -130, -90, -110, -120], // Expense (سالب عشان تحت الصفر)
      name: 'Expenses',
      type: 'bar',
      marker: {
        color: '#912f56',
      },
      opacity: 0.8,
      base: -10,
    };

    this.barData = [Income, Expenses];

    this.barLayout = {
      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,
      font: { color: this.mainColor },
      barmode: 'relative',
      bargap: 0.8,
      bargroupgap: this.isSmallScreen ? 0.5 : 0.2,
      xaxis: {
        showline: false, // إخفاء خط المحور X
        zeroline: false, // إخفاء خط الصفر على المحور X
        showgrid: false,
      },
      yaxis: {
        showline: false, // إخفاء خط المحور X
        zeroline: false, // إخفاء خط الصفر على المحور X
        showgrid: false,
        range: [-200, 300], // نطاق لعرض القيم السالبة والموجبة
      },
      showlegend: true,
      legend: {
        orientation: 'h',
        x: 1,
        xanchor: 'right',
        y: 1.2,
      },
      margin: {
        l: 40,
        r: 0,
        b: 50,
        t: 40,
        pad: 5,
      },
      responsive: true,
      autosize: true,
      height: 310,
      barcornerradius: 50,
    };

    //config for all charts
    this.config = {
      responsive: true,
      displayModeBar: false,
    };
  }

  updateChart() {
    const totals = this._invoices.getTotalInvoices(); // كدا انا برجع object من السيرفيس   {...}

    this.totalPaid = totals.totalPaid;
    this.overdue = totals.overdue;
    this.notPaid = totals.notPaid;
    const totalInvoices = this.totalPaid + this.overdue + this.notPaid;

    //donut chart
    const displayText = `$${(totalInvoices / 1000).toFixed(1)}K <br> Invoices`; // layout النص الذي يظهر في المربع الذي تحتوي على عدد الفواتير   >>> ف
    this.pieData = [
      {
        values: [this.totalPaid, this.overdue, this.notPaid], // Total Paid, Total Overdue, Total Unpaid
        labels: ['Total Paid', 'Total Overdue', 'Total Unpaid'],
        type: 'pie',
        hole: 0.55, // عشان يبقى Donut Chart
        marker: {
          colors: ['#60D479', '#5522C1', '#912f56'],
          line: {
            width: [10, 0, 0],
            color: ['#60D479', '#5522C1', '#912f56'],
          },
        },
        textinfo: this.isSmallScreen ? 'none' : 'label+value',
        textposition: 'outside',
        hovertemplate:  '<b>%{label}</b><br>Value:$%{value:,.0f}<br>Percentage: %{percent}<extra></extra>',
      },
    ];
    this.pieLayout = {
      responsive: true,
      autosize: true,

      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,
      font: { color: this.mainColor, family: 'Inter, sans-serif' },
      annotations: [
        {
          font: { size: 14, weight: 500 },
          showarrow: false,
          text: displayText, //   K النص في المنتصف    >>>>>>  الرقم دا بيعبر عن عدد الفواتير ب الالف
          x: 0.5,
          y: 0.5,
        },
      ],

      showlegend: true,
      legend: this.isSmallScreen
        ? { orientation: 'y', x: 0.4, y: -0.5 }
        : { orientation: 'h', x: 0.25 },
      height: 300,
      width: 'null',
      margin: { t: 60, b: 40, l: 40, r: 40 },
    };
  }
}

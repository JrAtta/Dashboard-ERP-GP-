import { CountUpModule } from 'ngx-countup';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { PlotlyModule } from 'angular-plotly.js';
import { InvoiceOverview } from '../../interfaces/invoice-overview';
import { InvoiceOverviewService } from '../../services/invoice-overview.service';
import { SearchDataService } from '../../services/search-data.service';
import { SearchPipe } from '../../pipe/search.pipe';

@Component({
  selector: 'app-overview-indicator',
  imports: [CountUpModule, NgClass, PlotlyModule,NgStyle,SearchPipe],
  templateUrl: './overview-indicator.component.html',
  styleUrl: './overview-indicator.component.scss'
})
export class OverviewIndicatorComponent implements OnInit {
 animate: boolean = false; // التحكم في الأنيميشن
 searchValue: string = '';

  root = document.documentElement;
  bgCard = getComputedStyle(this.root).getPropertyValue('--bg-card').trim();
  mainColor = getComputedStyle(this.root)
    .getPropertyValue('--main-color')
    .trim();

  invoiceOverview : InvoiceOverview[] = []
  indicatorData:any;
  indicatorLayout:any;
  config: any;
  amountOwen!:number;
  amountOwenPercent!:number;

  isSmallScreen: boolean = false;
  constructor(private _invoices:InvoiceOverviewService ,private _searchService:SearchDataService) { }
  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 480;

    this.updateChart();
  }



ngOnInit(): void {
  this.invoiceOverview = this._invoices.invoiceOverview;
  this.updateChart();

  setTimeout(() => {
    this.animate = true;
  }, 1000);

  this._searchService.searchValue$.subscribe(searchValue => this.searchValue = searchValue);
}


updateChart(){
    this.getAmountOwed()
    this.amountOwenPercent = this.amountOwen / (this._invoices.getTotalInvoices().totalPaid + this._invoices.getTotalInvoices().overdue +this._invoices.getTotalInvoices().notPaid ) * 100 ;

        this.indicatorData = [
    {
  type: "indicator",
  mode: "gauge+number",
  value: this.amountOwenPercent, // النسبة المئوية
  title: { text: "Progress Indicator", font: { size: 20 ,  weight:500 , family: 'Inter, sans-serif' } , },
  gauge: {
    axis: { range: [0, 100], tickwidth: 1, },
    bar: { color: "#60D479" },
 steps: [
      { range: [0, 100], color: '#5522C1' },
    ],
    threshold: {
      line: { color: '#fff', width: 3 },
      thickness: 1,
      value: this.amountOwenPercent
    },
  },
  number:{
    suffix: "%",
    font:{
      size:this.isSmallScreen ? 30 : 50,
      family: 'Inter, sans-serif', color:'#5522C1'
    },

  }
}

  ];

    this.indicatorLayout = {
      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,
      font: { color: this.mainColor ,size:this.isSmallScreen ? 10: 14, weight: 500 ,family: 'Inter, sans-serif' },
      width: this.isSmallScreen ? 350 : 400,
      height: 250,
      margin: { t: this.isSmallScreen ? 0 : 50, b: this.isSmallScreen ? 0 : 50, l: this.isSmallScreen ? 90 : 50, r: this.isSmallScreen ? 90 : 50 },
      responsive: true,
      autosize: true
    };

     this.config = {
      responsive: true,
      displayModeBar: false,
    };
  }
getAmountOwed(): number {
  return this.invoiceOverview.reduce((sum, item) => {
    if (item.status === 'Not Paid') return sum + (item.total ?? 0);
    if (item.status === 'Partially Paid') return sum + (item.unPaid ?? 0);
    if (item.status === 'Overdue') return sum + (item.total ?? 0);
    return this.amountOwen = sum ;
  }, 0);
}
sortInvoiceOverview(){
  this.invoiceOverview.sort((a, b)=> {
    return b.total - a.total ;
  });

}
}

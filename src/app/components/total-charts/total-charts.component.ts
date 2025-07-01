import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-total-charts',
  imports: [
    CountUpModule,
    NgClass,
    PlotlyModule
  ],
  templateUrl: './total-charts.component.html',
  styleUrl: './total-charts.component.scss'
})
export class TotalChartsComponent implements OnInit {

  root = document.documentElement
  bgCard = getComputedStyle(this.root).getPropertyValue('--bg-card').trim()
  mainColor = getComputedStyle(this.root)
    .getPropertyValue('--main-color')
    .trim()

    assetsChartData: any;
  assetsChartLayout: any;
  investmentChartData: any;
  investmentChartLayout: any;
  ChartConfig: any;

   assetsMainValue: number = 325980.65;
  investmentsMainValue: number = 270560.204312;
  formatValue = this.assetsMainValue.toFixed(2);
  intMainValue = Math.floor(+this.formatValue);
  formattedInteger = this.intMainValue.toLocaleString('en-US');
  decMainValue = String(this.formatValue).split('.')[1] || '00';

    isSmallScreen: boolean = false
  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 450;
    this.updateChart();
  }

  ngOnInit() {
      // second section
    // left section
    this.onResize(null)
    this.updateChart();


    // second section
    // right section
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
    ]; // for all axis X
    // Investments Time Series Chart
    const investmentValues = [
      220000, 225000, 215000, 235000, 245000, 240000, 250000, 255000, 260000,
      265000, 268000, 270560,
    ];

    this.investmentChartData = [
      {
        x: months,
        y: investmentValues,
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#60D479',
          width: 3,
          shape: 'spline',
          smoothing: .7,
        },
        marker: {
          color: '#60D479',
          size: 10,
          line: {
                        color: '#ffffff',
                        width: 2
                    }
        },
        // fill: 'tonexty',
        hovertemplate:
          '<b>%{x}</b><br>' + 'Value: $%{y:,.2f}<br>' + '<extra></extra>', // تعبئة المنطقة تحت الخط

      },
    ];
    this.investmentChartLayout = {
      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,
      font: { color: this.mainColor, family: 'Inter, sans-serif' },
      margin: { t: 0, b: 60, l: 60, r: 0 },
      xaxis: {
        // visible:false,
        // showgrid: false,
        showticklabels: false,
        tickfont: { size: 11 },
      },
      yaxis: {
        showgrid: true,
        tickformat: '$,.0f',
        tickfont: { size: 12 },
      },
    };

    //config on all charts
    this.ChartConfig = {
      responsive: true,
      scrollZoom: false,
      displayModeBar: false,
      animate: true,
    };
  }
  updateChart() {

     this.assetsChartData = [
      {
        values: [45000, 25000, 15000, 10000],
        labels: ['Stocks', 'Bonds', 'Real Estate', 'cash'],
        type: 'pie',
        marker: {
          colors: ['#5522C1', '#45B75E', '#6EC9FD', '#EA9014'],
          line: {
            width: 2,
            color: this.bgCard,
          },
        },
        textinfo: 'label+percent',
        textposition: 'inside',
        hovertemplate:
          '<b>%{label}</b><br>Value:$%{value:,.0f}<br>Percentage: %{percent}<extra></extra>',
      },
    ];

    this.assetsChartLayout = {
      responsive: true,
      autosize: true,

      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,
      font: { color: this.mainColor, family: 'Inter, sans-serif' },

      showlegend: this.isSmallScreen ? false : true,
      legend: {
        orientation: 'h',
        x: 0.16,
        y: -0.1,
        font: { color: this.mainColor },
      },
      height: window.innerWidth < 400  ? 300 : 400,
      // width:'null',
      margin: { t: this.isSmallScreen ? 20 : 40, b: this.isSmallScreen ? 0 : 40, l: this.isSmallScreen ? 10 : 40, r: this.isSmallScreen ? 10 : 40 },
    };
  }
}

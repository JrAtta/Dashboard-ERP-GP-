import { Component, OnInit } from '@angular/core';
import { PlotlyModule,  } from 'angular-plotly.js';
import { Istats } from '../../interfaces/istats';

import {  CountUpModule } from 'ngx-countup';
import { FormsModule } from '@angular/forms';
import { SearchDataService } from '../../services/search-data.service';
import { SearchPipe } from '../../pipe/search.pipe';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-charts',
  imports: [
    PlotlyModule,
    CountUpModule,
    FormsModule,
    SearchPipe,
    NgIf
],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
  searchValue: string = '';
  root = document.documentElement;
  bgCard = getComputedStyle(this.root).getPropertyValue('--bg-card').trim(); //
  mainColor = getComputedStyle(this.root)
    .getPropertyValue('--main-color')
    .trim();

  performanceChartData: any;
  performanceChartLayout: any;
  ChartConfig: any;


  constructor(private _searchService:SearchDataService ) { }
  quickStats: Istats[] = [
    {
      title: 'completed orders',
      value: 0,
      change: 0, // الفرق بين القيمة الحالية والقيمة السابقة
      changeLabel: 'From Last Month',
      colorIcon: '#2B8FE7',
      // chartData: [2120, 5800, 3500, 6300, 6922,], // عباره عن محور الصادات بس والسينات هتكون طول المصفوفه من 1 ل 5
      chartData: [5023, 3100, 7720, 4500, 2800, 6500, 4999, 7000, 2900, 3700, 6100, 5400], // عباره عن محور الصادات بس والسينات هتكون طول المصفوفه من 1 ل 5
      chartLayout: {},
    },

    {
      title: 'cancelled orders',
      value: 0,
      change: 0, // الفرق بين القيمة الحالية والقيمة السابقة
      changeLabel: 'From Last Month',
      colorIcon: '#895BE5',
      // chartData: [1200, 3100, 2250, 2600, 2400], // عباره عن محور الصادات بس والسينات هتكون طول المصفوفه من 1 ل 5
      chartData:  [1500, 3200, 1200, 2400, 3300, 1100, 3600, 2000, 2500, 3800, 1900, 3000], // عباره عن محور الصادات بس والسينات هتكون طول المصفوفه من 1 ل 5
      chartLayout: {},
    },
  ];
  change!: number ;

  ngOnInit(): void {




    // first section
    // left section
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
    const salesValues = [
      20000, 25000, 30000, 28000, 32000, 35000, 40000, 38000, 42000, 45000,
      43000, 47000,
    ];
    const expensesValues = [
      15000, 18000, 20000, 19000, 22000, 25000, 28000, 26000, 30000, 32000,
      31000, 34000,
    ];
    this.performanceChartData = [
      {
        x: months,
        y: salesValues,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Sales',
        line: { color: '#60D479', width: 3, shape: 'spline', smoothing: 1 },
        marker: { size: 10, color: '#6EC9FD', width: 2 },
        fill: 'tonexty', // === tozeroy
      },
      {
        x: months,
        y: expensesValues,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Expenses',

        line: { color: '#6EC9FD', width: 3, shape: 'spline', smoothing: 1 },
        marker: { size: 10, color: '#895BE5', width: 2 },
        fill: 'tozeroy',
      },
    ];

    this.performanceChartLayout = {

         // title: {
      //   text: 'Total Assets: $95,000',

      // },
      height: 450,
      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,
      font: { color: this.mainColor },
      xaxis: {
        title: 'Month',
        zeroline: false,
        showgrid: true,
        visible: false,
      },
      yaxis: {
        title: 'Amount',
        zeroline: false,
        // range: [0, 55000],
        visible: true,
      },
      showlegend: true,

      legend: { x: 0, y: 1.2, orientation: 'y' },
      margin: { t: 30, b: 20, l: 20, r:10 },
      autosize: true,
    };

    // right section
    this.quickStats.forEach((state) => {
      const currentValue = state.chartData[state.chartData.length - 1]; // القيمة الحالية
      const previouseValue = state.chartData[state.chartData.length - 2]; // القيمة السابقة للقيمة الحالية
       state.change = currentValue - previouseValue; // الفرق بين اخر قيمة والقيمة السابقة
       state.value = currentValue;
      // const isIncreas = state.change > 0; // هل القيمة زيادة او تقل

      const max = Math.max(...state.chartData);
      const indexOfMax = state.chartData.indexOf(max); // هستخدمها للدلاله علي محور السينات لانه ملوش قيم فعليه
      state.chartData = [
        {
          x:months,
          y: state.chartData,
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: state.colorIcon, width: 1.4, shape: 'spline' },
          marker: {
            color: state.colorIcon,
            size: state.chartData.map((item) => (item === max ? 15 : 0)), //  بقوله ي مارك اعلي قيمه بس
            width: 3,
            opacity: 1,
          },
          opacity: 0.6,
          // fill: 'toself',
          fill: 'tozeroy',
        },
      ];

      state.chartLayout = {
        width: 180,
        height: 100,
        paper_bgcolor: this.bgCard,
        plot_bgcolor: this.bgCard,
        font: { color: this.mainColor, family: 'Inter, sans-serif', size: 12 },
        showlegend: false, // إخفاء الـ Legend عشان ما يخرجش برا الـ div
        margin: {
          l: 0,
          r: 0,
          t: 0,
          b: 0,
        },
        shapes: [
          {
            type: 'line',
            x0: indexOfMax, // اسم الشهر اللي تم فيه تسجيل اكبر قيمه
            // y0: max,
            x1: indexOfMax, // اسم الشهر اللي تم فيه تسجيل اكبر قيمه
            y1:max,
            line: {
              color: state.colorIcon,
              width: 2,
              dash: 'dash', // dot , dashdot, solid
            },
            opacity: 0.6,
          },
        ],
        annotations: [
          {
            x: indexOfMax,
            y: max * 1.23, // دا مش لوجيك مطلوب دا عشان ال tooltip  متبقاش لازقه ف ال mark
            text: max,
            font: {
              size: 15,
              weight: 300,
              color: '#fff',
              family: 'Inter, sans-serif',
            },
            bgcolor: state.colorIcon,
            borderwidth: 10,
            // borderradius: 10,
            showarrow: true,
            arrowhead: 1, // بتغير شكل السهم من 1 ل 7
            arrowcolor: state.colorIcon,
            ax: 0,
            ay: -20, // بتحدد ارتفاع السهم
            align: 'center',
          },
        ],
        xaxis: {
          showline: false, // إخفاء خط المحور X
          zeroline: false, // إخفاء خط الصفر على المحور X
          // showgrid: false,
          visible: false,
        },
        yaxis: {
          showline: false, // إخفاء خط المحور X
          zeroline: false, // إخفاء خط الصفر على المحور X
          // showgrid: false,
          visible: true,
        },

      };
    });



    //config on all charts
    this.ChartConfig = {
      responsive: true,
      scrollZoom: false,
      displayModeBar: false,
      animate: true,
    };
    this._searchService.searchValue$.subscribe(searchValue => this.searchValue = searchValue);
  }
}

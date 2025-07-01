import { Component, OnInit } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  selector: 'app-best-selling',
  imports: [PlotlyModule],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.scss'
})
export class BestSellingComponent  implements OnInit {

 root = document.documentElement;
  bgCard = getComputedStyle(this.root).getPropertyValue('--bg-card').trim();
  mainColor = getComputedStyle(this.root)
    .getPropertyValue('--main-color')
    .trim();

  barData: any;
  barLayout: any;
  config: any;
  ngOnInit() {


    const bestSellingData = [12500, 10000, 18000, 6500, 5000];
    const newVal: string[] = []; // for formating values to 12K ,...

    bestSellingData.forEach((value) => {
      let newValFormatted = value / 1000 + 'K';
      newVal.push(newValFormatted);
    });
    this.barData = [
      {
        y: bestSellingData, // عدد الوحدات المباعة
        x: [
          'Engine Parts',
          'Wheel Parts',
          'Circuit Boards',
          'Cables',
          'Sensors',
        ], // أسماء المنتجات
        type: 'bar',
        orientation: 'y', // افقي
        marker: {
          color: ['#2B8FE7', '#5522C1', ' #60D479', '#912f56', '#FFA53E'],
          line: {
            color: this.bgCard,
            width: 5,
          },
        },
        opacity: 0.9,
        text: newVal, // عدد الوحدات المباعة
        textposition: 'outside',
        hovertemplate: '<b>%{x}</b><br>Sales: $%{y:,.0f}<extra></extra>',
      },
    ];

    this.barLayout = {
      paper_bgcolor: this.bgCard,
      plot_bgcolor: this.bgCard,
      font: { color: this.mainColor, weight: 500, family: 'Inter, sans-serif' },
      xaxis: {
        showgrid: false,
        showticklabels: true,
      },
      yaxis: {
        range: [0, 20000],

        zeroline: false,
        showticklabels: true,
      },
      showlegend: false, // مش محتاجين أسطورة لأن الأسماء على المحور Y
      responsive: true,
      autosize: true,
      margin: {
        l: 25, // مسافة على الشمال عشان أسماء المنتجات تبان كاملة
        r: 10,
        t: 50,
        b: 50,
      },
      height: 400,
      barcornerradius: 10,
    };


      this.config = {
      responsive: true,
      displayModeBar: false,
    };

  }

}

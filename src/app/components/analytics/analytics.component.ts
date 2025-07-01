import { Component, HostListener, OnInit } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { InvoicesCashflowComponent } from '../invoices-cashflow/invoices-cashflow.component';
import { OverviewIndicatorComponent } from '../overview-indicator/overview-indicator.component';
import { BestSellingComponent } from "../best-selling/best-selling.component";
import { CustomerExpensesComponent } from "../customer-expenses/customer-expenses.component";
PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-analytics',
  imports: [
    InvoicesCashflowComponent,
    OverviewIndicatorComponent,
    BestSellingComponent,
    CustomerExpensesComponent
],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {

}

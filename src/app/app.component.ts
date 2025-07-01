import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { EvaIconService } from './services/eva-icon.service';
import { HeaderComponent } from "./components/header/header.component";
PlotlyModule.plotlyjs = PlotlyJS;


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'ERP_DATA_VIZ';
  istoggled: boolean = false;
  toggleSideBar(){
    console.log(this.istoggled);
    this.istoggled = !this.istoggled
  }


  constructor(private elRef: ElementRef , private _evaService: EvaIconService) {}

  ngOnInit() {
    this._evaService.initializeEvaIcons();
  }

  ngAfterViewInit() {
    this.observeDomChanges();
    this._evaService.initializeEvaIcons();
  }



  observeDomChanges() {  // عادة تحميل الأيقونات عند تغيير DOM
    const targetNode = this.elRef.nativeElement;
    const observer = new MutationObserver(() => {
      this._evaService.initializeEvaIcons()      // إعادة تحميل الأيقونات عند تغيير DOM
    });
    observer.observe(targetNode, { childList: true, subtree: true });
  }




}

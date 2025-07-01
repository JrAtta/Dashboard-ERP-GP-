import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnInit, Output, PLATFORM_ID,  } from '@angular/core';
import * as eva from 'eva-icons';
import { EvaIconService } from '../../services/eva-icon.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-side-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent   {

  @Output() toggleSideBar = new EventEmitter();

  toggleSideBarEvent(){
    this.toggleSideBar.emit();
  }



}

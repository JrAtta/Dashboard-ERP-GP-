import { ElementRef, Injectable } from '@angular/core';
import * as eva from 'eva-icons';

@Injectable({
  providedIn: 'root'
})
export class EvaIconService {
  
  constructor() { }
  initializeEvaIcons() {
    if (typeof eva !== 'undefined') {
      eva.replace();
    }
  }


}

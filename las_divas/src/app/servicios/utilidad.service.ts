import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor() { }

  getDateTime() : string{
    var fecha = new Date();
    let d,m,y,h,min,s;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();
    h = fecha.getHours().toString();
    min = fecha.getMinutes().toString();
    s = fecha.getSeconds().toString();

    return y + "-" + m + "-" + d + "_" + h + "-" + min + "-" + s;
  }
}

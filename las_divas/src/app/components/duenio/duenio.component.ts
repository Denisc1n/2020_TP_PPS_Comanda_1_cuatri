import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.component.html',
  styleUrls: ['./duenio.component.scss'],
})
export class DuenioComponent implements OnInit {

  solicitudes:boolean = false;
  constructor() { }

  ngOnInit() {}

  verSolicitudes()
  {
    this.solicitudes = true;
  }
}

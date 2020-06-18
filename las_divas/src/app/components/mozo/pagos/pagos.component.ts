import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()

  constructor() { }

  ngOnInit() {}

  back(){
    this.volver.emit('home')
  }
}

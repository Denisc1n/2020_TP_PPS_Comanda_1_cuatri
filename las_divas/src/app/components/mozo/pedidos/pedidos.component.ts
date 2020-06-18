import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()

  constructor() { }

  ngOnInit() {}

  back(){
    this.volver.emit('home')
  }
}

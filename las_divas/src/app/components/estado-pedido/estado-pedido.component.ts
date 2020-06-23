import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-estado-pedido',
  templateUrl: './estado-pedido.component.html',
  styleUrls: ['./estado-pedido.component.scss'],
})
export class EstadoPedidoComponent implements OnInit {

  @Output() volver:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  salir(){
    this.volver.emit(undefined)
  }

}

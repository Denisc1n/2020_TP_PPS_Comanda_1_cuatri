import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.component.html',
  styleUrls: ['./pedidos-pendientes.component.scss'],
})
export class PedidosPendientesComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()
  pedidos:any;
  mesaSeleccionadaComida : any;
  mesaSeleccionadaBebida : any;

  constructor(private fireService : FirebaseService) {
    this.actualizarLista()
   }

  ngOnInit() {}

  back(){
    this.volver.emit('home')
  }


  actualizarLista(){
    this.fireService.getDB("mesas").then(datos=>this.pedidos=datos)
  }
}

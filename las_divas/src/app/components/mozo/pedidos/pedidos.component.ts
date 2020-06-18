import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()
  pedidos:any;

  constructor(private fireService : FirebaseService) {
    this.fireService.getDisabledClient().then((datos) => {
      this.pedidos = datos;
      console.log(this.pedidos);

      if(this.pedidos.length == 0){
        document.getElementById("msj-solicitudes").innerHTML = "No hay pedidos pendientes";
      }
    })
   }

  ngOnInit() {}

  back(){
    this.volver.emit('home')
  }

  cambiarEstado(option:string,pedido:any)
  {
    let i = this.pedidos.indexOf(pedido);
    this.pedidos.splice(i, 1);

    if(option == 'habilitar')
        pedido.habilitado = 'aceptado'
    else
        pedido.habilitado = 'rechazado'

    //this.fireService.updateDoc("pedido", pedido.correo, pedido)

    console.log(this.pedidos);

    if(this.pedidos.length == 0){
      document.getElementById("msj-solicitudes").innerHTML = "No hay solicitudes pendientes";
    }
  }
}

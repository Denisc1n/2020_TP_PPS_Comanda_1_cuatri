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
  this.Actualizar();
   }

  ngOnInit() {}

  back(){
    this.volver.emit('home')
  }

  cambiarEstado(option:string,pedido:any)
  {
    let date = new Date()
    let hora = date.getUTCHours()
    if(option == 'habilitar')
        pedido.estado = 'en proceso'

    this.fireService.updateDoc("mesas", `Mesa ${pedido.numero} Las Divas`, pedido)

    this.Actualizar();
    if(pedido.pendienteComida)
      this.fireService.sendNotification(`Mesa ${pedido.numero} - ${hora}`, 'cocinero')
    if(pedido.pendienteBebida)
      this.fireService.sendNotification(`Mesa ${pedido.numero} - ${hora}`, 'bartender')
  
  }

  Actualizar() {
    this.fireService.getPendingOrder().then((datos) => {
      this.pedidos = datos;
      

      if(this.pedidos.length == 0){
        document.getElementById("msj-pedidos").innerHTML = "No hay pedidos pendientes";
      }
    })
  }
}

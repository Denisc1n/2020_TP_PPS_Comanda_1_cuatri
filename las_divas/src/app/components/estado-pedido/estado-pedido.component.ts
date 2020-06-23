import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

import { AngularFirestore } from 'angularfire2/firestore';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { UtilidadService } from 'src/app/servicios/utilidad.service';
import { VibrationService } from 'src/app/servicios/vibration.service';

@Component({
  selector: 'app-estado-pedido',
  templateUrl: './estado-pedido.component.html',
  styleUrls: ['./estado-pedido.component.scss'],
})
export class EstadoPedidoComponent implements OnInit {

  @Input() mesaOcupada:string = 'Mesa 1 Las Divas'
  @Output() volver:EventEmitter<any> = new EventEmitter<any>();
  mesa:any;
  estado:string;

  constructor(private fireService : FirebaseService, private db: AngularFirestore, private pedidosService:PedidosService, private utilidadService:UtilidadService, private vibrationService:VibrationService) {
    this.db.collection('mesas').doc(this.mesaOcupada).snapshotChanges().subscribe(data=>this.traerMesa())
   }

  ngOnInit() {
    //this.db.collection('notificaciones').doc('dueño').update({email: 'asd@asd.com'})
  }

  salir(){
    this.volver.emit(undefined)
  }

  traerMesa() {
    this.fireService.getTable(this.mesaOcupada).then(dato=>{
      this.mesa = dato
      this.estado = this.upperCaseToFirstUpperCase(this.mesa.estado.toLocaleUpperCase())
    })
  }

  pedidoRecibido(){
    if(this.mesa.estado == 'entregado')
      this.pedidosService.changeOrderStatus('estado', 'recibido', this.mesaOcupada)
    else{
      this.utilidadService.textoMostrar('#modal-error-text-p-general', 'El mozo aún no entregó el pedido', '#modal-error-general', '.container-home')
      this.vibrationService.error()
    }
  }

  upperCaseToFirstUpperCase(string:string){
    let notFirstChar = string.substring(1, string.length).toLowerCase()
    string = string.substring(0,1) + notFirstChar
    console.log(string)
    return string
  }

}

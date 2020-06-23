import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-estado-pedido',
  templateUrl: './estado-pedido.component.html',
  styleUrls: ['./estado-pedido.component.scss'],
})
export class EstadoPedidoComponent implements OnInit {

  @Output() volver:EventEmitter<any> = new EventEmitter<any>();
  mesas:any;

  constructor(private fireService : FirebaseService, private db: AngularFirestore) {
    this.traerLista();
   }

  ngOnInit() {
    //this.db.collection('notificaciones').doc('dueño').update({email: 'asd@asd.com'})
  }

  salir(){
    this.volver.emit(undefined)
  }

  traerLista() {
    this.fireService.getPendingOrder().then((datos) => {
      this.mesas = datos;
  })
  }

}

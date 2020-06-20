import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()
  mesas:any;

  constructor(private fireService : FirebaseService) {
    this.actualizarLista()
   }

  ngOnInit() {}

  back(){
    this.volver.emit('home')
  }

  actualizarLista(){
    this.fireService.getDB("mesas").then(datos=>this.mesas=datos)
  }
}

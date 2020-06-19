import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()
  consultas:any;

  constructor(private fireService : FirebaseService) {
    this.actualizarLista()
   }

  ngOnInit() {}

  back(){
    this.volver.emit('home')
  }

  actualizarLista(){
    this.fireService.getDB("mesas").then(datos=>this.consultas=datos)
  }

}

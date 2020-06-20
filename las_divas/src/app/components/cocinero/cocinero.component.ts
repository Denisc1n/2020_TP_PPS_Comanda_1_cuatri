import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.scss'],
})
export class CocineroComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()
  consultas:any;
  mesaSeleccionada:any;

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

  displayModal(mesa:any)
  {
    (<HTMLInputElement>document.querySelector(".ctn-lista-mesas")).style.filter = "blur(5px)"
    this.mesaSeleccionada = mesa;
  }

  quitModal()
  {
    (<HTMLInputElement>document.querySelector(".ctn-lista-mesas")).style.filter = "none";
    this.mesaSeleccionada = null;
  }

}
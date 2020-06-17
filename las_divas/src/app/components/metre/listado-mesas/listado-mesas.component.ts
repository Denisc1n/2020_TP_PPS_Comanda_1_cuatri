import { Component, OnInit, Input ,Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilidadService } from 'src/app/servicios/utilidad.service';

@Component({
  selector: 'app-listado-mesas',
  templateUrl: './listado-mesas.component.html',
  styleUrls: ['./listado-mesas.component.scss'],
})
export class ListadoMesasComponent implements OnInit {

  @Input()clienteSeleccionado;
  @Output()vaciarCliente : EventEmitter<any> = new EventEmitter<any>();
  mesas : any;
  mesaSeleccionada: any;

  constructor(private fireService : FirebaseService, private s_utilidad : UtilidadService) {
    this.fireService.getDB("mesas").then((datos) => {
      this.mesas = datos;
      console.log(this.mesas);

    })
   }

  ngOnInit() {

  }

  seleccionarMesa(mesa) {
    this.mesaSeleccionada = mesa;
    console.log(this.mesaSeleccionada);

    if(mesa.ocupada) {
      this.s_utilidad.textoMostrar("#modal-error-mesa-text-p","Mesa ocupada", "#modal-error-mesa", ".ctn-lista-mesas")
    }
  }

  back() {
    this.vaciarCliente.emit(null);
  }

}

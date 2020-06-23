import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()
  mesas:any;
  consultaConfirmation: boolean = false;
  consultaMesa: any;

  constructor(private fireService : FirebaseService) {
    this.actualizarLista()
   }

  ngOnInit() {
    
  }

  back(){
    this.volver.emit('home')
  }

  actualizarLista(){
    this.fireService.getClientQuery().then(datos=>this.mesas=datos)
    

  }

  cerrarConsulta() {
    this.consultaMesa.consulta = ""
    this.fireService.updateDoc("mesas", `Mesa ${this.consultaMesa.numero} Las Divas`, this.consultaMesa);
    this.actualizarLista();
  }

}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-metre',
  templateUrl: './metre.component.html',
  styleUrls: ['./metre.component.scss'],
})
export class MetreComponent implements OnInit {

  clientes:any;
  constructor(private fireService : FirebaseService) 
  {
    this.fireService.getDisabledClient().then((datos) => {
      this.clientes = datos;
      console.log(this.clientes);

      if(this.clientes.length == 0){
        document.getElementById("msj-espera").innerHTML = "No hay clientes en espera";
      }
    })
  }

  ngOnInit(){
  }

  actualizarLista(cliente:any)
  {
    this.fireService.updateDoc("cliente", cliente.correo, cliente)

    console.log(this.clientes);

    if(this.clientes.length == 0){
      document.getElementById("msj-espera").innerHTML = "No hay clientes en espera";
    }
  }
}
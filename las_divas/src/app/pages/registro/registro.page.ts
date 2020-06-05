import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre:string;
  apellido:string;
  correo:string
  clave:string
  dni:number
  file:string;
  
  constructor(private servicio : FirebaseService) { }

  ngOnInit() {
  }

  focus(id) {
    document.getElementById(id).style.borderBottom = "1px solid rgb(36, 136, 202)";
  }

  noFocus(id) {
    document.getElementById(id).style.borderBottom = "1px solid ghostwhite";
  }

  registrar()
  {
    this.servicio.registerEmail(this.correo, this.clave).then(() => {

    }).catch((error)=>{
      
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { QRScannerService } from 'src/app/servicios/qrscanner.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {

  currentUser
  dataCurrentUser
  listaEspera: boolean;

  constructor(private QRService:QRScannerService, private fireService:FirebaseService) {
    this.currentUser = fireService.getCurrentUser()

    if(!this.currentUser.isAnonymous)
      fireService .getDBByDoc('cliente', this.currentUser.email).then(data=>this.dataCurrentUser=data)
    else
      fireService .getDBByDoc('clientesInvitados', this.currentUser.uid).then(data=>this.dataCurrentUser=data)
  }

  ngOnInit() {}

  scanListaDeEspera(){
    this.QRService.scan().then((a:any)=>{
      if(a.text == 'listaDeEsperaLasDivas'){

        if(!this.currentUser.isAnonymous)
          this.fireService.createDocInDB('listaEspera', this.currentUser.email, this.dataCurrentUser)
        else
          this.fireService.createDocInDB('listaEspera', this.currentUser.uid, this.dataCurrentUser)

        this.listaEspera = true;
        document.getElementById("container-client-p").innerHTML = "Mesa asignada";

      }
      else{
        console.error('Primero debe ir a la lista de espera')
      }
    })
  }
}

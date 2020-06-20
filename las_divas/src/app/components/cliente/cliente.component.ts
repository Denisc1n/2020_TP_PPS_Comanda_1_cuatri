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
  mesaOcupada:string;
  estadoCliente:string 

  constructor(private QRService:QRScannerService, private fireService:FirebaseService) {
    this.currentUser = fireService.getCurrentUser()

    if(!this.currentUser.isAnonymous){
      fireService.getDBByDoc('cliente', this.currentUser.email).then(data=>this.dataCurrentUser=data);

      this.fireService.getWaitingList(this.currentUser.email).then((data:any) => {
        if(data != undefined)
          this.estadoCliente = 'listaEspera';
      });
    }
    else{
      fireService.getDBByDoc('clientesInvitados', this.currentUser.uid).then(data=>this.dataCurrentUser=data);

      this.fireService.getWaitingList(this.currentUser.uid).then((data:any) => {
        if(data != undefined)
          this.estadoCliente = 'listaEspera';
      });
    }

  }

  ngOnInit() {}

  scanListaDeEspera(){
    this.QRService.scan().then((a:any)=>{
      if(a.text == 'listaDeEsperaLasDivas'){

        if(!this.currentUser.isAnonymous)
          this.fireService.createDocInDB('listaEspera', this.currentUser.email, this.dataCurrentUser)
        else
          this.fireService.createDocInDB('listaEspera', this.currentUser.uid, this.dataCurrentUser)

        this.estadoCliente = 'listaEspera';
      }
      else{
        console.error('Primero debe ir a la lista de espera')
      }
    })
  }

  scanMesa()
  {
    this.QRService.scan().then((a:any)=>{

      this.fireService.getWaitingList(this.currentUser.email).then((datos:any) => {

        if(datos != undefined)
        {
          this.fireService.getTable(a.text).then((data:any) => {

            if(!data.ocupada)
            {
              data.ocupada = true;
              data.cliente = this.dataCurrentUser;
              data.pedido = {productos: {}, total: 0};
              data.pendienteBebida = false;
              data.pendienteComida = false;
              data.consulta = "";
              switch(a.text)
              { 
                case 'Mesa 1 Las Divas':
                  this.fireService.updateDoc("mesas", a.text, data)
                  this.estadoCliente = 'enMesa';
                  this.mesaOcupada = 'Mesa 1 Las Divas';
                  break;

                case 'Mesa 2 Las Divas':
                  this.fireService.updateDoc("mesas", a.text, data)
                  this.estadoCliente = 'enMesa';
                  this.mesaOcupada = 'Mesa 2 Las Divas';
                  break;

                case 'Mesa 3 Las Divas':
                  this.fireService.updateDoc("mesas", a.text, data)
                  this.estadoCliente = 'enMesa';
                  this.mesaOcupada = 'Mesa 3 Las Divas';
                  break;

                case 'Mesa 4 Las Divas':
                  this.fireService.updateDoc("mesas", a.text, data)
                  this.estadoCliente = 'enMesa';
                  this.mesaOcupada = 'Mesa 4 Las Divas';
                  break;

                default:
                  console.log("el qr no es el correcto");
              }
            }
            else
              console.log("mesa ocupada");
          })
        }
      })
    })
  }

  scanEncuesta(){
    
  }
}
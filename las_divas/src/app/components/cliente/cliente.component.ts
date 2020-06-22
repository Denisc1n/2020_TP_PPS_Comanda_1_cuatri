import { Component, OnInit } from '@angular/core';
import { QRScannerService } from 'src/app/servicios/qrscanner.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {

  currentUser;
  dataCurrentUser;
  mesaOcupada:string;
  estadoCliente:string = "opts";
  encuesta:boolean = false;
  pago:boolean;
  mesaParaPagar:any;
  opt:string;
  encuestaTerminada:boolean = false;

  constructor(private QRService:QRScannerService, private fireService:FirebaseService, private pedidoService:PedidosService) {
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
      
            if(this.estadoCliente == 'listaEspera' && data != undefined){
              if(!data.ocupada)
              {
                data.ocupada = true;
                data.cliente = this.dataCurrentUser;
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
                    console.error("el qr no es el correcto");
                }
              }
              else
                console.error("mesa ocupada");
            }
            else if(this.estadoCliente == 'encuesta'){
              this.estadoCliente = 'opts';
            }
            else{
              console.log("Codigo incorrecto");
            }
          })
        }
      })
    })
  }

  scanEncuesta(){

    this.QRService.scan().then((a:any) => {

      if(a.text == "Encuesta Las Divas")
      {
        this.encuesta = true;
      }

    })  
    
  }

  pagar()
  {
    this.fireService.getTable(this.mesaOcupada).then((datos:any) => {
      datos.pagoPendiente = true;
      this.opt = 'pagar';
      this.mesaParaPagar = datos;
      this.fireService.updateDoc("mesas", this.mesaOcupada, datos);
    })
  }

  irse(){
    this.pedidoService.isPaymentPending(this.mesaOcupada).then((a:any)=>{
      if(!a.pagoPendiente){
        this.pago = true;
        this.estadoCliente='despedida';
      }
      else{
        console.log("todavia no pagaste bro");
      }
    })
  }
}
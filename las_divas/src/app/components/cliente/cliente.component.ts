import { Component, OnInit } from '@angular/core';
import { QRScannerService } from 'src/app/servicios/qrscanner.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { UtilidadService } from 'src/app/servicios/utilidad.service';
import { VibrationService } from 'src/app/servicios/vibration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {

  currentUser;
  dataCurrentUser;
  mesaOcupada:string;
  estadoCliente:string;
  encuesta:boolean = false;
  pago:boolean;
  mesaParaPagar:any;
  opt:string;
  encuestaTerminada:boolean = false;

  constructor(private QRService:QRScannerService, private fireService:FirebaseService, private pedidoService:PedidosService, private utilidadService:UtilidadService, private vibrationService:VibrationService, private navegador : Router) {
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
        this.fireService.sendNotification(Math.floor(Math.random() * (10000 - 1) + 1), 'metre')
      }
      else{
        this.utilidadService.textoMostrar('#modal-error-text-p-general', 'Primero debes anotarte a la lista de espera', '#modal-error-general', '#container-client')
        this.vibrationService.error()
      }
    })
  }

  scanMesa()
  {

    let aux:any = this.currentUser.isAnonymous ? this.currentUser.uid : this.currentUser.email;

    this.QRService.scan().then((a:any)=>{
      this.fireService.getWaitingList(aux).then((datos:any) => {

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
                    this.fireService.deleteWaitingList(aux);
                    break;
  
                  case 'Mesa 2 Las Divas':
                    this.fireService.updateDoc("mesas", a.text, data)
                    this.estadoCliente = 'enMesa';
                    this.mesaOcupada = 'Mesa 2 Las Divas';
                    this.fireService.deleteWaitingList(aux);
                    break;
  
                  case 'Mesa 3 Las Divas':
                    this.fireService.updateDoc("mesas", a.text, data)
                    this.estadoCliente = 'enMesa';
                    this.mesaOcupada = 'Mesa 3 Las Divas';
                    this.fireService.deleteWaitingList(aux);
                    break;
  
                  case 'Mesa 4 Las Divas':
                    this.fireService.updateDoc("mesas", a.text, data)
                    this.estadoCliente = 'enMesa';
                    this.mesaOcupada = 'Mesa 4 Las Divas';
                    this.fireService.deleteWaitingList(aux);
                    break;
  
                  default:
                    console.error("el qr no es el correcto");
                    this.utilidadService.textoMostrar('#modal-error-text-p-general', 'El QR no es el correcto', '#modal-error-general', '#container-client')
                    this.vibrationService.error()
                }
              }
              else{
                console.error("mesa ocupada");
                this.utilidadService.textoMostrar('#modal-error-text-p-general', 'La mesa se encuentra ocupada', '#modal-error-general', '#container-client')
                this.vibrationService.error()
              }
            }
            else{
              console.log("Codigo incorrecto");
            }
          })
        }
        else{
          this.estadoCliente = 'opts';
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
        this.estadoCliente= undefined;
        this.opt = undefined;
      }
      else{
        console.error("todavia no pagaste bro");
        this.utilidadService.textoMostrar('#modal-error-text-p-general', 'Todavía no has pagado', '#modal-error-general', '.btn-pedir-cuenta')
        this.vibrationService.error()
      }
    })
  }

  salir(){
    this.opt = undefined
  }

}
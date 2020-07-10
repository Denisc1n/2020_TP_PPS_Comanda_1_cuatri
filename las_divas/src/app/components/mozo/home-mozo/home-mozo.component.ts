import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-mozo',
  templateUrl: './home-mozo.component.html',
  styleUrls: ['./home-mozo.component.scss'],
})
export class HomeMozoComponent implements OnInit {

  redirect = 'home'

  firstTimeConsulta = 0;
  firstTimeComida = 0;
  firstTimeBebida = 0;
  
  constructor(private db:AngularFirestore) { }

  ngOnInit() {    
    this.db.collection('notificaciones').doc('mozoConsulta').snapshotChanges().subscribe(data=>this.activarNotificacionConsulta())
    this.db.collection('notificaciones').doc('mozoComida').snapshotChanges().subscribe(data=>this.activarNotificacionComida())
    this.db.collection('notificaciones').doc('mozoBebida').snapshotChanges().subscribe(data=>this.activarNotificacionBebida())
    this.db.collection('notificaciones').doc('mozoComidaNueva').snapshotChanges().subscribe(data=>this.activarNotificacionComidaNueva())

  }

activarNotificacionConsulta(){
  
  if(this.firstTimeConsulta > 0){
    $("#notificacion-push").css("top","2%");
      $("#content-title").text("Nueva consulta");
      $("#content-msj").text("Tiene una nueva consulta");

      setTimeout(() => {
        $("#notificacion-push").css("top","-15%");
      }, 3000);
  }
  this.firstTimeConsulta += 1;
}

activarNotificacionComida(){
  
  if(this.firstTimeComida > 0){
    $("#notificacion-push").css("top","2%");
      $("#content-title").text("Actualizacion pedido");
      $("#content-msj").text("Ya está la comida lista!");

      setTimeout(() => {
        $("#notificacion-push").css("top","-15%");
      }, 3000);
    }
    this.firstTimeComida += 1;
  }

  activarNotificacionComidaNueva(){
  
    if(this.firstTimeComida > 0){
      $("#notificacion-push").css("top","2%");
        $("#content-title").text("Nuevo pedido");
        $("#content-msj").text("El cliente ha realizado un nuevo pedido");
  
        setTimeout(() => {
          $("#notificacion-push").css("top","-15%");
        }, 3000);
      }
      this.firstTimeComida += 1;
    }

  activarNotificacionBebida(){
    if(this.firstTimeBebida > 0){
      $("#notificacion-push").css("top","2%");
      $("#content-title").text("Actualizacion pedido");
      $("#content-msj").text("Ya está la bebida lista!");

      setTimeout(() => {
        $("#notificacion-push").css("top","-15%");
      }, 3000);    
    }
    this.firstTimeBebida += 1;
  }
}



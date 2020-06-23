import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-metre',
  templateUrl: './home-metre.component.html',
  styleUrls: ['./home-metre.component.scss'],
})
export class HomeMetreComponent implements OnInit {

  redirect:string = 'home';
  firstTime = 0;
  
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.db.collection('notificaciones').doc('metre').snapshotChanges().subscribe(data=>this.activarNotificacion())
  }

  activarNotificacion(){
    
    if(this.firstTime > 0){
      $("#notificacion-push").css("top","2%");
      $("#content-title").text("Nuevo usuario en lista de espera");
      $("#content-msj").text("Tiene un usuario nuevo en lista de espera");

      setTimeout(() => {
        $("#notificacion-push").css("top","-15%");
      }, 3000);
      
    }
    this.firstTime += 1;
  }

}

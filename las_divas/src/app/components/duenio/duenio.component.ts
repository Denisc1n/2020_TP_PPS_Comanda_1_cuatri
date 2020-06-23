import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.component.html',
  styleUrls: ['./duenio.component.scss'],
})
export class DuenioComponent implements OnInit {

  solicitudes:boolean = false;
  redirect = 'home'
  firstTime = true;
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.db.collection('notificaciones').doc('dueño').snapshotChanges().subscribe(data=>this.activarNotificacion())
  }

  verSolicitudes()
  {
    this.solicitudes = true;
  }

  activarNotificacion(){
    if(!this.firstTime){
      alert('hay uno nuevo wachin')
    }
  }
}

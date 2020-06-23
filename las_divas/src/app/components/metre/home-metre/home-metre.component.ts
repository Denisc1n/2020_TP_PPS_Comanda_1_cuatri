import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home-metre',
  templateUrl: './home-metre.component.html',
  styleUrls: ['./home-metre.component.scss'],
})
export class HomeMetreComponent implements OnInit {

  redirect:string = 'home';
  firstTime = true;
  
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.db.collection('notificaciones').doc('metre').snapshotChanges().subscribe(data=>this.activarNotificacion())
  }

  activarNotificacion(){
    if(!this.firstTime){
      alert('hay uno nuevo en la lista de espera perro')
    }
  }

}

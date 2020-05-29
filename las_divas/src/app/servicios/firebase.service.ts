import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) { }

  logout(){
    return this.afAuth.auth.signOut();
  }

  loginEmail(email:string, pass:string){

    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then(userData => {
        resolve(userData)
       
      }, err => reject (err)).catch( e=>reject(e))
    });
  }

  getCurrentUser():any{
    return this.afAuth.auth.currentUser
  }

  getUsers()
  {
    return new Promise((resolve, reject) => {
      this.db.collection("usuarios").valueChanges().subscribe((datos)=> {
        resolve(datos);
      }, error => reject(error));
    })
  }
  
}

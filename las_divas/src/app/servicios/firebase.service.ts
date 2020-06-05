import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import {storage} from 'firebase'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore, private camera:Camera) { }

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

  getDB(collection)
  {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).valueChanges().subscribe((data)=> {
        resolve(data);
      }, error => reject(error));
    })
  }
  
  choosePhotoLibrary(){
    let photo
    let options:CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    }
  
    this.camera.getPicture(options).then(imageData=>{
      photo = 'data:image/jpeg;base64,' + imageData;
      return photo;
    });
  }

  uploadPhoto(photo, route:string, metaData=null){
    let photoUrl;
    const uploadString = storage().ref(route);

    uploadString.putString(photo, 'data_url');

    uploadString.getDownloadURL().then(url=>{
      photoUrl = url;
      if(metaData != null)
        uploadString.updateMetadata(metaData);
      return photoUrl;
    })
  }
     
  createDocInDB(collection:string, docName:string, data:any){
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(docName).set(data).then(succes=>resolve(succes)).catch(error=>reject(error));
    })
  }

  getDBByDoc(collection:string, docName:string){
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(docName).valueChanges().subscribe((data)=> {
        resolve(data);
      }, error => reject(error));
    })
  }

  registerEmail(email:string, password:string)
  {
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }
  
}

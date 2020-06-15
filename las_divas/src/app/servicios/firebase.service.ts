import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import {storage} from 'firebase'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private camera:Camera) { }

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

  getDB(collection:string)
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
  
    return new Promise((resolve, reject) => {
        this.camera.getPicture(options).then(imageData=>{
        photo = 'data:image/jpeg;base64,' + imageData;
        resolve(photo);
      },error => reject(error));
    });
  }

  uploadPhoto(photo, route:string, metaData=null){
    let photoUrl;
    const uploadString = storage().ref(route);

    return new Promise((resolve, reject)=>{ 
      uploadString.putString(photo, 'data_url').then(() => {
          
          uploadString.getDownloadURL().then(url=>{
          photoUrl = url;
          if(metaData != null)
            uploadString.updateMetadata(metaData);
          resolve(photoUrl);
        },error=>reject(error));
      })
    });

  }
     
  createDocInDB(collection:string, docName:string, data:any){
    this.db.collection(collection).doc(docName).set(data);
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
    return new Promise((resolve,reject)=> {
      this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((data)=>{
        resolve(data);
      },error => reject(error));
    })
  }

  registerAsAnonymously()
  {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInAnonymously().then((user:any) => {
        resolve(user.user.uid);
      });
    }) 
  }
  
  
  getUserProfile(email:string){
    return  new Promise((resolve,reject)=>{
        this.getDBByDoc('cliente', email).then((dataCli:any)=>{
          if(dataCli != undefined)
            resolve(dataCli.perfil)
          else{
            this.getDBByDoc('mozo', email).then((dataMozo:any)=>{
              if(dataMozo != undefined)
                resolve(dataMozo.perfil)
              else{
                this.getDBByDoc('cocinero', email).then((dataCoc:any)=>{
                  if(dataCoc != undefined)
                    resolve(dataCoc.perfil)
                  else{
                    this.getDBByDoc('bartender', email).then((dataBar:any)=>{
                      if(dataBar != undefined)
                        resolve(dataBar.perfil)
                      else{
                        this.getDBByDoc('supervisor', email).then((dataSup:any)=>{
                          if(dataSup != undefined)
                            resolve(dataSup.perfil)
                          else{
                            this.getDBByDoc('dueño', email).then((dataDuen:any)=>{
                              if(dataDuen != undefined)
                                resolve(dataDuen.perfil)
                              else{
                                this.getDBByDoc('metre', email).then((dataMet:any)=>{
                                  if(dataMet != undefined)
                                    resolve(dataMet.perfil)
                                  else {
                                resolve('No existe')
                              }
                            },e=>reject(e))
                          }
                        },e=>reject(e))
                      }
                    },e=>reject(e))
                  }
                },e=>reject(e))
              }
            },error=>reject(error))
          }
        },error=>reject(error))
      }
    },error=>reject(error))
  })
  }

    getDisabledClient()
    {
      return new Promise((resolve,reject) => {
        this.db.collection('cliente', ref => { return ref.where('habilitado', '==', 'pendiente')}).valueChanges().subscribe((clientes:any) => {
          resolve(clientes);
        },error=>reject(error))
      })
    }
    
    updateDoc(collection:string, doc:string, data:any)
    {
      this.db.collection(collection).doc(doc).update(data);
    }

    getWaitingList(email:string)
    {
      return new Promise((resolve, reject) => {
        this.db.collection("listaEspera").doc(email).valueChanges().subscribe((datos) => {
          resolve(datos);
        },error => reject(error));
      }) 
    }


    getTable(id:string)
    {
      return new Promise((resolve, reject) => {
        this.db.collection("mesas").doc(id).valueChanges().subscribe((datos) => {
          resolve(datos);
        },error => reject(error));
      })
    }
}

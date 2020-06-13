import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class QRScannerService {

  constructor(private scanner:BarcodeScanner) { }

  /* scan(){
    return new Promise((resolve, reject)=>{
      let scanSub
      this.scanner.prepare().then( (status : QRScannerStatus) => { //pido permisos para ingresar a la camara
        if(status.authorized)
        {
            this.scanner.show();
            document.getElementsByTagName("body")[0].style.opacity = "0"; // pongo el fondo con opacidad para que aparezca la camara
    
            scanSub = this.scanner.scan().subscribe( (respuesta) => { //espero que scanea el codigo y si es correcto que entre
    
            document.getElementsByTagName("body")[0].style.opacity = "1";
            this.scanner.hide(); // hide camera preview
            scanSub.unsubscribe(); //paro de scannear
            let destroy = this.scanner.destroy()
            resolve(respuesta)
          }, (error) => {
              reject(error); // si incorrecto muestra error
          });
        }
      });
  
    })
  } */

  destroy(){
    //let destroy = this.scanner.()
  }  

  scan(format:string=""){ 
    return new Promise((resolve, reject)=>{
      this.scanner.scan({ "formats": `${format}` }).then(data=>{
        resolve(data)
      }).catch(e=>reject(e))
    })
  }

  decodeDNI(code:string){
    let parsedData = code.split('@');
    let nombre = parsedData[2].toString();
    let apellido = parsedData[1].toString();
    let dni: number = +parsedData[4];

    return {nombre: nombre, apellido: apellido, dni: dni}
  }
}

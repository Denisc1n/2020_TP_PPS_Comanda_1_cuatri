import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {

  constructor(private fire : FirebaseService) { }

  cometario:string;
  @Input() mesa:string;
  @Output() cancelar : EventEmitter<any> = new EventEmitter<any>();
  @Output() finalizar : EventEmitter<any> = new EventEmitter<any>();
  mesaData:any;
  propina:number;

  ngOnInit() 
  {
    this.fire.getTable(this.mesa).then((data) =>
    {
      this.mesaData=data; 
    });
  }

  getRadio()
  {
    let aux_radio:any= document.querySelectorAll('input[type=radio]');

    for(let item of aux_radio)
    {
      if(item.checked)
      {
        return item.value;
      }
    }
  }

  getComentario()
  { 
    return (<HTMLInputElement>document.querySelector('#encuesta-textarea')).value;
  }

  finalizarEncuesta()
  {
    switch(this.getRadio())
    {
      case 'Excelente':
        this.propina = 20;
        break;
      case 'Muy bien':
        this.propina = 15;
        break;
      case 'Bien':
        this.propina = 10;
        break;
      case 'Regular':
        this.propina = 5;
        break;
      case 'Malo':
        this.propina = 0;
        break;
    }

    if(this.propina > 0)
    {
      this.mesaData.pedido.porcentajePropina = `${this.propina}%`
      this.mesaData.pedido.propina = ((this.mesaData.pedido.total*this.propina) / 100);
      this.mesaData.pedido.totalConPropina = (this.mesaData.pedido.total + this.mesaData.pedido.propina);
    }
    else
    {
      this.mesaData.pedido.porcentajePropina = `${this.propina}%`
      this.mesaData.pedido.propina = this.propina
      this.mesaData.pedido.totalConPropina = this.mesaData.pedido.total;
    }

    this.subirEncuesta();
    this.fire.updateDoc("mesas", this.mesa, this.mesaData);
    this.finalizar.emit("pagar");
  }

  subirEncuesta()
  {
    this.mesaData.encuesta = {comentario: this.getComentario(), satisfecho : this.getRadio()}
  }


}

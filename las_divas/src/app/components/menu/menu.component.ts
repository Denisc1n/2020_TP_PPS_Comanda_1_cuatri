import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Output() terminoPedido:EventEmitter<any> = new EventEmitter<any>()
  @Input() mesaOcupada:string
  listadoPedido = {platos: {milanesa:{cantidad:0, precio: 330},fideos:{cantidad:0, precio:230}, muzzarelitas:{cantidad:0, precio:190}, hamburguesa:{cantidad:0, precio:280}},
                   bebidas: {gaseosa:{cantidad: 0, precio: 100}, agua:{cantidad: 0, precio: 80}, cerveza:{cantidad: 0, precio: 60}},
                   postres: {chocotorta:{cantidad: 0, precio: 70}, helado: {cantidad: 0, precio: 80}, flan:{cantidad: 0, precio: 50}}};
  totalAmount:number = 0;
  orderConfirmation:boolean = false;
  menu:string = 'platos'

  constructor(private pedidosService:PedidosService) { }

  ngOnInit() { }

  desplegarMenu(id)
  {
    document.getElementById(id).style.transform = "scaleY(1)";
    document.querySelectorAll(".open-icon").forEach(element => {
      element.setAttribute("hidden", "true");
    })
  }

  quitarMenu(id)
  {
    document.getElementById(id).style.transform = "scaleY(0)";
    document.querySelectorAll(".open-icon").forEach(element => {
      element.removeAttribute("hidden");
    })
  }

  agregarProducto(descripcion:string, precio:number, tipo:string)
  {

    if(this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()]){
      this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()].cantidad++;
      this.totalAmount+= this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()].precio
    }
    else{
      this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()]={ precio:precio, cantidad: 1};
      this.totalAmount+= this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()].precio
    }
  }

  removerProducto(descripcion:string, tipo:string)
  {
    if(this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()] && this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()].cantidad > 0){
      this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()].cantidad--;
      this.totalAmount-= this.listadoPedido[tipo.toLocaleLowerCase()][descripcion.toLocaleLowerCase()].precio  
    }
  }

  agregarPedido(){
    this.pedidosService.addOrderToOrders(this.listadoPedido, this.mesaOcupada,this.totalAmount);
    this.pedidosService.addOrderToTable(this.listadoPedido, this.mesaOcupada, this.totalAmount);
    this.terminoPedido.emit(true);
  }

}

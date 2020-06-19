import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor() { }

  listadoPedido = [];

  ngOnInit() {}

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

  agregarProducto(descripcion:string, precio:number)
  {
    this.listadoPedido.push({nombre:descripcion, precio:precio});
  }

  removerProducto(descripcion:string, precio:number)
  {
    let i = this.listadoPedido.indexOf({nombre:descripcion, precio:precio});
    this.listadoPedido.splice(i, 1);
  }

}

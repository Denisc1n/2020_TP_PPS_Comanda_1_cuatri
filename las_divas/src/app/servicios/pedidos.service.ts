import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private db:AngularFirestore) { }

  addOrderToTable(order, table, totalAmount){
    this.db.collection("mesas").doc(table).valueChanges().subscribe((data:any)=>{
      console.log(data)
      data.pedido.total = totalAmount;
      data.pedido.productos = order;
      this.db.collection("mesas").doc(table).update(data);
    })
  }

  addOrderToOrders(order, table, totalAmount){
    this.db.collection('pedidos').doc(table).valueChanges().subscribe((data:any)=>{
      data.total = totalAmount;
      data.productos = order;
      this.db.collection('pedidos').doc(table).update(data);
    })
  }
}

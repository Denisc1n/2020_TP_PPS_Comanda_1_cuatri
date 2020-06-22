import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private db:AngularFirestore) { }

  addOrderToTable(order, table, totalAmount, pendentFood, pendentDrink){
    let obs =this.db.collection("mesas").doc(table).valueChanges().subscribe((data:any)=>{
      data.pendienteBebida = pendentDrink;
      data.pendienteComida = pendentFood;
      data.pedido.total = totalAmount;
      data.pedido.productos = order;
      this.db.collection("mesas").doc(table).update(data).then(a=>obs.unsubscribe());
    })
  }

  addOrderToOrders(order, table, totalAmount){
    let obs = this.db.collection('pedidos').doc(table).valueChanges().subscribe((data:any)=>{
      data.total = totalAmount;
      data.productos = order;
      data.estado = 'pendiente';
      this.db.collection('pedidos').doc(table).update(data).then(a=>obs.unsubscribe());
    })
  }

  sendQuery(query:string, table){
    this.db.collection('mesas').doc(table).update({consulta: query});
  }

  sendQueryPayment(query:boolean, table){
    this.db.collection('mesas').doc(table).update({pagoPendiente: query});
  }
}

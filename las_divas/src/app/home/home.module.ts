import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DuenioComponent } from '../components/duenio/duenio.component';
import { HomeMozoComponent } from '../components/mozo/home-mozo/home-mozo.component';
import { PagosComponent } from '../components/mozo/pagos/pagos.component';
import { PedidosComponent } from '../components/mozo/pedidos/pedidos.component';
import { ConsultasComponent } from '../components/mozo/consultas/consultas.component';
import { ClienteComponent } from '../components/cliente/cliente.component';
import { SolicitudesComponent } from '../components/solicitudes/solicitudes.component';
import { ListadoMesasComponent } from '../components/metre/listado-mesas/listado-mesas.component';
import { MenuComponent } from '../components/menu/menu.component';
import { HomeMetreComponent  } from '../components/metre/home-metre/home-metre.component'
import { HomePageRoutingModule } from './home-routing.module';
import { ListaEsperaComponent  } from '../components/metre/lista-espera/lista-espera.component'
import { BartenderComponent } from '../components/bartender/bartender.component';
import { CocineroComponent } from '../components/cocinero/cocinero.component';
import { EncuestaComponent } from '../components/encuesta/encuesta.component';
import { BebidasPipe } from '../pipes/bebidas.pipe';
import { ComidasPipe } from '../pipes/comidas.pipe';
import { PedidosPendientesComponent } from '../components/mozo/pedidos-pendientes/pedidos-pendientes.component';
import { EstadoPedidoComponent } from '../components/estado-pedido/estado-pedido.component';
import { ChangeStatusColorDirective } from '../directives/change-status-color.directive'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    DuenioComponent,
    HomeMozoComponent,
    ClienteComponent,
    SolicitudesComponent,
    ListadoMesasComponent,
    MenuComponent,
    HomeMetreComponent,
    PagosComponent,
    PedidosComponent,
    ConsultasComponent,
    ListaEsperaComponent,
    ListadoMesasComponent,
    BartenderComponent,
    CocineroComponent,
    EncuestaComponent,
    BebidasPipe,
    ComidasPipe,
    PedidosPendientesComponent,
    EstadoPedidoComponent,
    ChangeStatusColorDirective]
})
export class HomePageModule {}

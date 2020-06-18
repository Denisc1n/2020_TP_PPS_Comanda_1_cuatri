import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DuenioComponent } from '../components/duenio/duenio.component';
import { MozoComponent } from '../components/mozo/mozo.component';
import { ClienteComponent } from '../components/cliente/cliente.component';
import { SolicitudesComponent } from '../components/solicitudes/solicitudes.component';
import { MetreComponent } from '../components/metre/metre.component';
import { ListadoMesasComponent } from '../components/metre/listado-mesas/listado-mesas.component';
import { MenuComponent } from '../components/menu/menu.component';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    DuenioComponent,
    MozoComponent,
    ClienteComponent,
    SolicitudesComponent,
    MetreComponent,
    ListadoMesasComponent,
    MenuComponent]
})
export class HomePageModule {}

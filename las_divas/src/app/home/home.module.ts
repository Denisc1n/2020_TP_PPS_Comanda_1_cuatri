import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DuenioComponent } from '../components/duenio/duenio.component';
import { MozoComponent } from '../components/mozo/mozo.component';
import { ClienteComponent } from '../components/cliente/cliente.component';

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
    ClienteComponent]
})
export class HomePageModule {}

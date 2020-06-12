import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../servicios/firebase.service';
import { UtilidadService } from '../servicios/utilidad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteHabilitadoGuard implements CanActivate {

  constructor(private fire : FirebaseService, private utilidad : UtilidadService){}
  current :any;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.current = this.fire.getCurrentUser();
    return this.fire.getDBByDoc("clientes",this.current.email).then((datos:any) => {
      if(datos.habilitado){
        return datos.habilitado
      }
      else{
        this.utilidad.textoMostrar("#mensajeTexto", "Usted no se encuentra autorizado, contactese con el mozo", "#mensajeLogin", "");
      }
    })
  }
  
}

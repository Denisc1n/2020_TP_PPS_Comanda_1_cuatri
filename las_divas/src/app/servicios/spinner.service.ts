import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private router : Router) { }

  activate(id:string, idBackdrop:string){
    $(`#${idBackdrop}`).removeAttr('hidden');
    $(`#${id}`).removeAttr('hidden');
  }

  deactivate(id:string, idBackdrop:string){
    $(`#${idBackdrop}`).attr('hidden', true);
    $(`#${id}`).attr('hidden', true);
  }

  async activateAndRedirect(id:string, idBackdrop:string, time:number,route:string){
    await this.activateFor(id, idBackdrop,time);
    this.router.navigate([route]);
  }

  activateFor(id:string, idBackdrop:string, time:number){
    this.activate(id, idBackdrop);
    setTimeout(() => {
      this.deactivate(id, idBackdrop);
    }, time);
  }
}

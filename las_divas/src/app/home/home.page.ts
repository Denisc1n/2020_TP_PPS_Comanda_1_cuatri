import { Component } from '@angular/core';
import { FirebaseService } from '../servicios/firebase.service';
import { SpinnerService } from '../servicios/spinner.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentUser
  tipoUser

  constructor(private fireService:FirebaseService, private spinnerService:SpinnerService, private location : Location) {
    spinnerService.activateFor('backdrop', 2000);
    this.currentUser = fireService.getCurrentUser()

    if(!this.currentUser.isAnonymous)
      fireService.getUserProfile(this.currentUser.email).then((data:any)=>{this.tipoUser=data});
    else
      this.tipoUser = 'cliente';

  }

back()
{ 
  this.location.back();
}

}

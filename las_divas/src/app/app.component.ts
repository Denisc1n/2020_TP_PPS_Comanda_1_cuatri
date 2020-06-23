import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  splash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private http : HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show()
      this.splashScreen.hide();
      if(this.splash) { 
        setTimeout(() => {
          this.sendEmail();
          this.splash = false;
          this.router.navigate(['login']);
         },5000);
       }
    });
  }

  sendEmail()
  {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/matiassh20@gmail.com',
        { name: "test", replyto: "herreranmatias@gmail.com", message: "probando bro"},
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
          }
        );
  }
}

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'StartPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage: Storage
      
  ) {
        platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level natived things you might need.
      statusBar.styleDefault();
      splashScreen.hide();  
      /*
             // Get the status from the storage
        this.storage.get('loginStatus').then(loggedIn => {
          if(loggedIn){
            this.storage.get('userData').then(data=>{
              
            })
          }
          this.rootPage = loggedIn ? 'TabsPage' : 'StartPage';
        });
        */
      });
  }
}


import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'StartPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    private authService:AuthServiceProvider,
    public push: Push,
  ) {
      //this.storage.clear();
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level natived things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
     // this.pushNotification();
       this.storage.get('loginStatus').then(data=>{
         console.log(data);
         if(data){
           this.storage.get('userCredentials').then(data=>{
             console.log(data)
             this.authService.signInWithEmailAndPassword(data);
           });
            this.rootPage = 'TabsPage';
            //this.rootPage = 'RegisterPage';
         }else{
           this.rootPage = 'StartPage';
         }
       })
      });
  }
  /*
  pushNotification(){
    const options: PushOptions = {
      android: {
        senderID:'1023118639001',
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }

   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  */
}


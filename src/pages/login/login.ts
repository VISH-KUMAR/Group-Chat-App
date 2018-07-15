import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
 
import { Storage } from '@ionic/storage';

//importing the interface
import { LoginResponse } from '../../models/login/loginResponse.interface';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  
  constructor(
    private navCtrl: NavController,
    private toast:ToastController,
    private storage: Storage
  ) {
  }

  /////// Handling the login response ///////
  login(event){
    console.log(event)
    if(!event.error){
      this.toast.create({
        message:`Welcome to GroupChat`,
        duration:3000,
        position: 'top'
      }).present();
      
      this.storage.set('loginStatus',true);

      this.navCtrl.setRoot('EditProfilePage');
      
    }
    else{
      this.toast.create({
        message: event.error.message,
        duration:3000,
        position: 'top'
      }).present();
    } 
  }
}

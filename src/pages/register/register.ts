import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

//Auth service
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    private authService:AuthServiceProvider
  ) {
  }
  
  register(event:any){
    console.log(event);
    if(!event.error){

      this.toast.create({
        message:"Account Created Successfully",
        duration: 3000
      }).present();

    this.navCtrl.push('LoginPage');  
    }else{
      this.toast.create({
        message:event.error.message,
        duration:3000,
      }).present()
    }
  }

}

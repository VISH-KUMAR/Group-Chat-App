import { Component , Output , EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';



import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Account } from '../../models/registerAccount/account.interface';
@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  @Output() registerStatus: EventEmitter<any>;

  account = {} as Account; //creating an object of Account type we don't need to import it in this way
  constructor(
    private navCtrl:NavController,
    private toast:ToastController,
    private authService:AuthServiceProvider
  ) {
    this.registerStatus = new EventEmitter<any>();
  }
  async submit() {
    try{
    console.log(this.account);  
    const registerResponse = await this.authService.createUserWithEmailAndPassword(this.account);
    this.registerStatus.emit(registerResponse);
  }
  catch(err){
    this.registerStatus.emit(err)
  }
  }
}


import { Component ,EventEmitter ,Output } from '@angular/core';
import { NavController,LoadingController,Loading } from 'ionic-angular';

/////// Interface ///////////
import { Account } from '../../models/registerAccount/account.interface';
import { LoginResponse } from '../../models/login/loginResponse.interface';

/////// Auth services ////////
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';

import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  account = {} as Account;
  @Output() loginData:EventEmitter<any>;
  loader:Loading;
  constructor(
    private navCtrl:NavController,
    private authService:AuthServiceProvider,
    private afAuth:AngularFireAuth,
    private loadingCtrl:LoadingController,
    private storage:Storage,
    public googlePlus:GooglePlus,
  ) {
    this.loginData = new EventEmitter<any>();
 
  }

  async submit(){
    console.log(this.account);
    this.storage.set('userCredentials',this.account);
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange:true,
      duration:4000
    });
    // this 'loginResponse' is the reponse of the AuthService so we can get a error or a result
    // and still we can emit this result to our login page
    // const loginResponse = this.authService.signInWithEmailAndPassword(this.account);
    // this.loginData.emit(loginResponse);
    // console.log(loginResponse)
    
    // var user = firebase.auth().currentUser;
    // console.log(user);
    this.loader.present();
    try{
    const result = {
     result: await this.afAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password),
    }
    //emiting the data from here
    this.loginData.emit(result);
  }
    catch(err){
      //emitting the error 
      console.log(err)
      const error:LoginResponse = {
        error:err
        
      }
      this.loader.dismiss();
      this.loginData.emit(error);
    }
    
  }
  registerPage(){
    this.navCtrl.push('RegisterPage');
  }
  login(){
    alert('you are loggin with google id');
     this.authService.loginWithGoogle();
    // if(status){
    //   this.navCtrl.setRoot('TabsPage'); 
    // }
    /*
      this.googlePlus.login({
        'webClientId':'1023118639001-e361mahqj7qoapu553o1nkujcem91ora.apps.googleusercontent.com',
        'offline':true
      }).then(res =>{
        firebase.auth().signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(res.idToken))
              .then(suc =>{
                alert('LOGIN SUCCESSFUL')
                this.navCtrl.setRoot('EditProfilePage');
              }).catch(err=>{
                alert('LOGIN UNSUCCESSFUL')
                this.navCtrl.setRoot('LoginPage');
              })
      })
      */
   
  }
  goToRegisterPage(){
    this.navCtrl.push('RegisterPage');
  }
  forgetPassword(){
    alert("Dusra Account Bna le...........(:");
    alert("this functionality will come soon...");
  }

}

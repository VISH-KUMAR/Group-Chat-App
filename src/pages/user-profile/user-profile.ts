import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//user Profile service provider
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  userProfile = {};
  email:string;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private profileDataService:ProfileDataServiceProvider,
    private authService:AuthServiceProvider,
    private storage:Storage
  ) {

    
    //getting the user profile details from dataService in the form of obserbvable
    this.userProfile = this.profileDataService.getUserData1();
    //console.log(this.profileDataService.getUserData());
    console.log(this.userProfile)
    // this.storage.get('userProfile').then((val)=>{
    //   console.log(val);
    //   this.userProfile = val;
    // })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }
  editUserDetails(user){
    this.navCtrl.push('EditProfilePage' );
  }

  signOut(){
    this.authService.signOut();
    this.navCtrl.setRoot('LoginPage');
  }
}

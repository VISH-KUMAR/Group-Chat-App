import { Component , NgZone} from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';

//importing the userProfile interface
import { UserProfile } from '../../models/userProfile/userProfile.interface';

//importing user profile data service provider
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service'
import { ImghandlerProvider } from '../../providers/image-handler/image-handler';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent{
  //imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';

  userProfile:UserProfile={
    firstName: '',
    lastName:'',
    userName:'',
    avatar:'',
    status:'' 
  }
  
  loader:Loading;

  constructor(  
    private navCtrl:NavController,
    private loadingCtrl:LoadingController,
    private profileDataService:ProfileDataServiceProvider,
    private storage: Storage,
    public imgservice: ImghandlerProvider,
    public zone: NgZone
   ) {
      console.log(this.userProfile.avatar)
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange:true,
      duration:3000
      });

      ///getting the userdata from local storage////
      // this.storage.get(this.profileDataService.getUserId()).then(
      //   (val)=>{
      //     console.log(val);
      // })
    
      this.loader.present();
        setTimeout(()=>{
          let user =  this.profileDataService.getUserData()
           user.subscribe((data:any)=>{
             console.log(data)
             if(data != null){
               this.userProfile = data.data;
               this.loader.dismiss();
             }
          })
        }),2000
    }
  submit(){
    this.profileDataService.setData(this.userProfile);
    this.navCtrl.setRoot('TabsPage');

    let userData = {
      userID:this.profileDataService.getUser().uid,
      userEmail:this.profileDataService.getUser().email,
      user:this.userProfile
    }
    //console.log(userData)
    //this.storage.set('userData',userData)
  }

}

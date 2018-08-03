import { Component, NgZone } from '@angular/core';
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
export class EditProfileFormComponent {
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/group-chat-825fc.appspot.com/o/profileimages%2Fcar1.png?alt=media&token=67dd5760-8869-4678-9ae6-fd6371eb3455';
  moveon: boolean;

  userProfile: UserProfile = {
    firstName: '',
    lastName: '',
    userName: '',
    avatar: '',
    status: '',
  }

  loader: Loading;
  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private profileDataService: ProfileDataServiceProvider,
    private storage: Storage,
    public imgservice: ImghandlerProvider,
    public zone: NgZone
  ) {

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true,
      duration: 3000
    });

    ///getting the userdata from local storage////
    // setTimeout(()=>{
    //   this.storage.get('userData').then(
    //     (val)=>{
    //       console.log(val);
    //   })
    // },4000);

    this.loader.present();
    /////// Getting the user Profile from storage /////
    this.storage.get('userProfile').then(
      (val) => {
        if (val != null) {
          console.log(val);
          this.userProfile = val.data;
          if (val.profilePic != '' || val.profilePic != null) {
            this.imgurl = val.profilePic;
          }

          this.navCtrl.setRoot('TabsPage');
        }
      })
      
    setTimeout(() => {
      let user = this.profileDataService.getUserData()
      user.subscribe((data: any) => {
        console.log(data)
        if (data != null) {
          this.userProfile = data.data;
          if (data.profilePic != '' || data.profilePic != null) {
            this.imgurl = data.profilePic;
          }
            this.profileDataService.setData( this.userProfile , this.imgurl );
            this.navCtrl.setRoot('TabsPage');           
          this.loader.dismiss();
        }
      })
    }, 2000);
  }

  submit() {
    console.log(this.userProfile)
    this.profileDataService.setData(this.userProfile, this.imgurl);
    this.navCtrl.setRoot('TabsPage');

    let userData = {
      userID: this.profileDataService.getUser().uid,
      user: { data: this.userProfile, profilePic: this.imgurl },
      loginStatus: true
    }
    console.log(userData);
    //this.storage.set('userData',userData);
  }

  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        if (this.imgurl != '') {
          this.moveon = false;
        }
      })
    })
  }

  removePhoto() {
    this.imgurl = 'https://firebasestorage.googleapis.com/v0/b/group-chat-825fc.appspot.com/o/profileimages%2Fcar1.png?alt=media&token=67dd5760-8869-4678-9ae6-fd6371eb3455';
    this.moveon = true;
  }
}

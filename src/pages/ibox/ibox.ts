import { Component,  OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-ibox',
  templateUrl: 'ibox.html',
})
export class IboxPage implements OnDestroy {
  users = [];
  userId: string;
  usersData: Subscription;
  showSearch:boolean = false;
  userNames = [];
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private profileService: ProfileDataServiceProvider,
    private storage:Storage
  ) {
   // this.userId = this.profileService.getUserId();
    this.storage.get('authenticatedUser').then((val)=>{
      console.log(val);
      this.userId = val.uid;
    })

    ///////// Getting All the users from Databasee ///////////
    this.usersData = this.profileService.getAllUsers().subscribe(
      (data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].id != this.userId) {
            console.log(data[i]);
            this.users.push(data[i]);
            //this.userNames.push(data[i].data.firstName)
          }
        }
      }
    )
  }
  ngOnDestroy() {
    this.usersData.unsubscribe();
  }
  //////// Swipe Gesture //////////
  swipe(event) {
    if (event.direction === 4) {
      this.navCtrl.parent.select(0);
    }
  }

  //// show the user photo on page in popover /////
  showPhoto(myEvent, userImg: string) {
    const popover = this.popoverCtrl.create('ProfilePhotoPopoverPage',
      {
        userImage: userImg
      });
    popover.present({
      ev: myEvent
    });
  }
////////// Moving to Chat page/////////
  navigateToPage(user) {
    this.profileService.setSelectedUser(user);
    this.navCtrl.push('ChatPage', {
      userDetails: user
    });
  }

  //////////Moving To Search User page///////////
  searchUserPage() {
    console.log('opening the search box')
    //this.showSearch = !this.showSearch;
    this.navCtrl.push('SearchUserPage')
    // this.content.scrollToTop();
  }
  /////////////////////////////////////
  user;
  getUsers(ev: any) {
    console.log(ev)
    const name = ev.target.value;
    console.log(name);
    if(name != ''){
      this.user = this.profileService.searchUser(name);
      this.user.subscribe(data=>{console.log(data)})
      console.log(this.user)
    }
  //   // Reset items back to all of the items
  //  // this.initializeItems();

  //   // set val to the value of the searchbar
  //   const val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.userNames = this.userNames.filter((item) => {
  //       console.log(item.toLowerCase().indexOf(val.toLowerCase()));
  //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  }

}

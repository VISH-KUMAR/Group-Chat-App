import { Component,  OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-ibox',
  templateUrl: 'ibox.html',
})
export class IboxPage implements OnDestroy {

  users = [];
  userId: string;
  usersData: Subscription;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private profileService: ProfileDataServiceProvider
  ) {
    this.userId = this.profileService.getUserId();

    ///////// Getting All the users from Databasee ///////////
    this.usersData = this.profileService.getAllUsers().subscribe(
      (data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id != this.userId) {
            console.log(data[i]);
            this.users.push(data[i]);
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
    this.navCtrl.push('SearchUserPage')
  }

}

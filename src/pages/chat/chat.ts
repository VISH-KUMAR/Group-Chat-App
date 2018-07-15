import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { Message } from '../../models/message/message.interface';
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user;
  userId:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileDataService: ProfileDataServiceProvider
  ) {
  }

  ///////////////////////////
  ionViewWillLoad() {
    this.user = this.navParams.get('userDetails');
    this.userId = this.profileDataService.getUserId();
  }

  /////// Navigatge to user profile page ////////////
  profilePage() {
    this.navCtrl.push('ProfilesPage', {
      user: this.user
    });
  }

  navigateToPage() {
    this.navCtrl.push('ProfilesPage')
  }
  /////// Message form inputbox ////////
  msgFromSendBox(data) {
    this.profileDataService.sendChatMessage(this.userId, data, this.user);
  }
}

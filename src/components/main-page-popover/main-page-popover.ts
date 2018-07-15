import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'main-page-popover',
  templateUrl: 'main-page-popover.html'
})
export class MainPagePopoverComponent {
  items = [];
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private authService: AuthServiceProvider,
    private modalCtrl:ModalController
  ) {
  }

  userProfilePage() {
    this.navCtrl.push('UserProfilePage');
  }

  findFriends(){
    this.navCtrl.push('SearchUserPage');
  }

  createFriendsGroup(){
    console.log('alertBox')
    let modal = this.modalCtrl.create('ModalPage');
    modal.present();
  }

  createPublicGroup(){

  }

  close() {
    this.viewCtrl.dismiss();
  }

}

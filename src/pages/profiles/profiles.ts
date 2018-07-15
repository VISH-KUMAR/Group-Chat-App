import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('user'));
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesPage');
  }

}

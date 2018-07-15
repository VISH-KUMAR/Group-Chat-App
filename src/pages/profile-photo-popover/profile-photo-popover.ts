import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ProfilePhotoPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-photo-popover',
  templateUrl: 'profile-photo-popover.html',
})
export class ProfilePhotoPopoverPage {
  userImage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.userImage = this.navParams.get('userImage');
      console.log(this.userImage);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}

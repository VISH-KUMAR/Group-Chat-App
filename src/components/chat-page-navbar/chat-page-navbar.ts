import { Component ,Input} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'chat-page-navbar',
  templateUrl: 'chat-page-navbar.html'
})
export class ChatPageNavbarComponent {
  @Input() user;
  
  constructor(private navCtrl:NavController) {
  }
  ///////// Users Profile Page /////////
  profilePage(){
    this.navCtrl.push('ProfilesPage',{
      user:this.user
    });
  }

}

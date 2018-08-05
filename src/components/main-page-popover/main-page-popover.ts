import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FlagServiceProvider } from '../../providers/flag-service/flag-service';
import { UserGroupChatServiceProvider } from '../../providers/user-group-chat-service/user-group-chat-service';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';


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
    private modalCtrl:ModalController,
    public flagService:FlagServiceProvider,
    private publicGroupChatService:ChatServiceProvider,
    public alertCtrl:AlertController
  ) {
  }

  userProfilePage() {
    this.flagService.setEditProfileFlag();
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

    this.alertCtrl.create({
      title:'Group Name',
      inputs:[{
        name:'GroupName'
      }],
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Add',
          handler:data=>{
            //this.chatService.addGroup(data.channelName)
            this.publicGroupChatService.createPublicGroup(data.GroupName)
        }
        }
      ]
    }).present();
  }

  ////// Moving to All Public groups Modal Page /////////
  publicGroups(){
    console.log('going to main page popover')
    let publicGroupsModal = this.modalCtrl.create('PublicGroupsPage');
    publicGroupsModal.present();
  }
  close() {
    this.viewCtrl.dismiss();
  }



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { UserGroupChatServiceProvider } from '../../providers/user-group-chat-service/user-group-chat-service';
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { FlagServiceProvider } from '../../providers/flag-service/flag-service';


@IonicPage()
@Component({
  selector: 'page-group-profile',
  templateUrl: 'group-profile.html',
})
export class GroupProfilePage {
  group;
  groupName:string;
  groupData;
  totalFriends:number;

  exit:boolean;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl:ModalController,
    private userGroupService:UserGroupChatServiceProvider,
    private profileDataService:ProfileDataServiceProvider,
    public flagService:FlagServiceProvider
    ) {

     /////// Getting the group details /////// 
    this.groupData = this.navParams.get('group');
    console.log(this.groupData)
    this.group = this.groupData.group;
    console.log(this.group)
    this.totalFriends = this.group.length;
    this.groupName = this.groupData.groupName;

    this.exit = this.groupData.isGroupMember;
    console.log(this.exit);

  }


  ionViewWillLoad() {
    this.flagService.setModalFlag();
    
  }


  ionViewWillLeave(){
   this.flagService.resetModalFlag();
  }

  /////////////// Adding member ////////
  addMember(){
    let modal = this.modalCtrl.create('ModalPage', { group:this.groupData });
    modal.present();
  }

  /////// Exit Group //////
  exitGroup(){
    this.exit = false;
    this.userGroupService.exitGroup(this.groupData.id,this.profileDataService.getUserId())
  }
}

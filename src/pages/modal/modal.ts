import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavParams } from 'ionic-angular';

import { Observable, Subscription } from 'rxjs';

/////////// Services ////////////
import { UserGroupChatServiceProvider } from '../../providers/user-group-chat-service/user-group-chat-service';
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { FlagServiceProvider } from '../../providers/flag-service/flag-service';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage implements OnDestroy {
  users1: Observable<any[]>;
  users2: Subscription;
  users=[];
  flag: boolean = true;
  groupName: string;
  selectedUsers = [];
  members;
  flags: boolean[] = [];
  groupId: string;
  userId:string;
  groupCreator;
  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private userGroupService: UserGroupChatServiceProvider,
    private profileDataService: ProfileDataServiceProvider,
    private flagService: FlagServiceProvider
  ) {
    this.userId = this.profileDataService.getUserId();
  }

  ionViewWillLoad() {
    this.flag = this.flagService.getModalFlag();
    console.log(this.flag)
    if (this.flag) {
      let group = this.navParams.get('group');
      this.groupName = group.groupName;
      console.log(this.groupName)
      this.groupId = group.id;
      console.log(this.groupId)
    }

    console.log('ionViewDidLoad ModalPage');
    this.users1 = this.profileDataService.getAllUsers();
    this.users2 = this.users1.subscribe(data => {
      console.log(data);
     // this.users = data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == this.userId) {
          this.groupCreator = data[i]; 
        }else{
          this.flags[i] = false;
          console.log(data[i]);
          this.users.push(data[i]);
        }
      }
    })

    if (!this.flag) {

      this.alertCtrl.create({
        title: 'Group Name',
        inputs: [{
          name: 'groupName'
        }], 
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              this.viewCtrl.dismiss();
            }
          },
          {
            text: 'Create Group',
            handler: data => {
              if (data.groupName != '') {
                console.log('creating a group')
                this.groupName = data.groupName
                this.userGroupService.addUserGroup(data.groupName)
              } else {
                this.viewCtrl.dismiss();
              }
            }
          }
        ]
      }).present();
    }
  }

  ngOnDestroy() {
    this.users2.unsubscribe();
    this.flagService.resetModalFlag();
  }

  //////// Saving the created group /////////
  save() {
    this.selectedUsers.push(this.groupCreator);
    if(this.selectedUsers.length<3){
      alert("You Have to choose at Least three friedns")
    }
    else{
    if (!this.flag) {
      ///Getting the group Id ///
      console.log(this.userGroupService.getGroupId(this.groupName))
      this.userGroupService.getGroupId(this.groupName).subscribe(
        data => {
          console.log(data)
          this.groupId = data[0].id;
          console.log(this.groupId)
        }
      )
    }

    /// sending the data to data userGroupService to set group to firebase ///
    setTimeout(() => {
      console.log(this.groupId)
      let groupUsers = {
        groupId: this.groupId,
        groupName: this.groupName,
        groupMembers: this.selectedUsers
      }
      this.userGroupService.createGroup(groupUsers);
      console.log(groupUsers)
      this.viewCtrl.dismiss();
    }, 1000)
    this.flagService.resetModalFlag();
  }
  }

  //////////// Selecting the Users to add in the group /////////////
  selectUser(user, i) {
    console.log(user);
    this.flags[i] = !this.flags[i];
    console.log(this.flags)
    if (this.selectedUsers.length == 0) {
      this.selectedUsers.push(user)
    }
    else {
      let flag: boolean = true;
      for (let i = 0; i < this.selectedUsers.length; i++) {
        if (user.id === this.selectedUsers[i].id) {
          console.log('user exist')
          this.selectedUsers.splice(i, 1);
          flag = false;
          break;
        }
      }
      if (flag) {
        console.log('user doesnot exist')
        this.selectedUsers.push(user)
      }
    }
  }

}

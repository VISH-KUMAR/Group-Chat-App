import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

/////// Data services ////////////
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { UserGroupChatServiceProvider } from '../../providers/user-group-chat-service/user-group-chat-service';
import { FlagServiceProvider } from '../../providers/flag-service/flag-service';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-user-group-chat',
  templateUrl: 'user-group-chat.html',
})
export class UserGroupChatPage implements OnDestroy {

  /*
  messages=[{
    msgFromId:'',
    userName:'',
    msg:'',
    time:''
  }];
 */
  group;
  userGroup: AngularFirestoreCollection<any>;
  user;
  userId: string;
  userGroupMember: AngularFirestoreCollection<any>
  members;
  flag: boolean = false;
  messages = [];
  gpMembers: Subscription;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private userGroupService: UserGroupChatServiceProvider,
    private profileDataService: ProfileDataServiceProvider,
    private afs: AngularFirestore,
    private flagService: FlagServiceProvider,
    private storage: Storage
  ) {
    this.flagService.setUserGroupChat();
    this.group = this.navParams.get('group')
    /*
    this.storage.get(this.group.id).then(
      (val)=>{
        console.log(val)
        this.messages = val;
        console.log(this.messages)
      })
      //this.storage.clear();
     */
    console.log(this.profileDataService.getUserData1());
    this.user = this.profileDataService.getUserData1();
    this.userId = this.profileDataService.getUserId();

    ///////// getting the group messages ////////////
    this.userGroup = this.afs.collection<any>(`/profiles/${this.userId}/groups/${this.group.id}/chats`, ref =>
      ref.orderBy('timestamp', 'asc'))
    this.userGroup.snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    ).subscribe(data => {
      this.messages = data;
      console.log(data)
    });
  }

  ionViewWillLoad() {
    ////////////// Grtting group members ///////////////
    this.gpMembers = this.userGroupService.getGroupMembers(this.group.id)
      .subscribe(data => {
        console.log(data)
        this.members = data;
      })


  }


  ////// Open group Profile page //////////
  groupProfile() {
    console.log(this.members)
    this.navCtrl.push('GroupProfilePage', {
      group: {
        id: this.group.id,
        groupName: this.group.groupName,
        group: this.members,
      }
    })
  }

  ////// sending the msg to group chat service //////////
  groupMsg(event) {
    console.log(this.members)
    console.log(event);
    this.userGroupService.setMsgToDatabse(this.user, event, this.group.id, this.members);
  }

  ////// deleting the message ///////////
  delete(message, i) {
    this.userGroupService.deleteMessage(message, this.userId, this.group.id)
    console.log(message)
    /*
    this.storage.get(this.group.id).then(
      (val)=>{
        val.splice(i,1);
        this.messages = val;
        this.storage.set(this.group.id,val);
        console.log(val)
      })
     */
  }

  //////// Unsubscribing the subscriber ////////// 
  ngOnDestroy() {
    this.gpMembers.unsubscribe();
  }

}

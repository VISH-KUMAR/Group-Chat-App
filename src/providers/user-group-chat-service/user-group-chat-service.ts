import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';

import { Storage } from '@ionic/storage';


@Injectable()
export class UserGroupChatServiceProvider {

  userGroup: AngularFirestoreCollection<any>
  userGroupMember: AngularFirestoreCollection<any>
  groupMemberData: Observable<any>;
  group: Observable<any>;
  groupData: Observable<any>;
  users: Observable<any>
  userId: string;
  messageDoc:AngularFirestoreDocument<any>;
  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileDataService: ProfileDataServiceProvider,
    private storage: Storage
  ) {
    //this.userId = this.profileDataService.getUserId();
    this.storage.get('authenticatedUser').then((val)=>{
      console.log(val);
      this.userId = val.uid;
    })
    console.log(this.userId)

  }


  addUserGroup(groupName) {
    // this.userGroup = this.afs.collection<any>(`/users_group/${this.userId}/groups`);
    // this.userGroup.add({groupName:groupName})
    this.userGroup = this.afs.collection<any>(`/users_group`);
    this.userGroup.add({ groupName: groupName })
  }
  
  //////////// Getting groupId WRt groupName //////
  getGroupId(groupName) {
    this.userGroup = this.afs.collection<any>(`/users_group`, ref => ref.where('groupName', '==', groupName));
    this.groupData = this.userGroup.snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        console.log(id)
        console.log(data)
        return { id, ...data }
      }))
    );
    return this.groupData;
  }

 ///////// set the database for creating group //////////
  createGroup(group) {
    console.log('savicng the group to database')

    //this.userGroup = this.afs.collection<any>(`users_group/${this.userId}/groups/${group.groupId}/members`)
    this.userGroup = this.afs.collection<any>(`users_group/${group.groupId}/members`)
    for (let i = 0; i < group.groupMembers.length; i++) {
      this.userGroup.doc(group.groupMembers[i].id).set({ userData: group.groupMembers[i].data });
      //setting the group in the selected members

      //setting the groupName in the profiles group
      this.afs.collection<any>(`profiles/${group.groupMembers[i].id}/groups`)
        .doc(group.groupId).set({ groupName: group.groupName })
    }
  }

  ///////// Exit group ////////////// 
  exitGroup(groupId, userId){
    console.log('Exiting the group')
    this.messageDoc = this.afs.doc(`users_group/${groupId}/members/${userId}`);
    this.messageDoc.delete();
  }
  msgInLS = [];
  //////////// Messages sending to database ////////////////
  setMsgToDatabse(user, msg, groupId, groupMembers) {
    var d = new Date();  
    var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
      d.getHours() + ":" + d.getMinutes() +":"+d.getSeconds();
    console.log(datestring);
    console.log(groupMembers)
    let msgData = { msgFromId: user.id, username: user.user.userName, msg: msg, time: datestring , timestamp: d }
    for (let i = 0; i < groupMembers.length; i++) {
      this.afs.collection<any>(`profiles/${groupMembers[i].id}/groups/${groupId}/chats`)
        .add(msgData);
    }

    /*
    // sending to local storage /////
    this.storage.get(groupId).then((val)=>{  
      if(val != null){
        this.msgInLS = val;
        this.msgInLS.push(msgData);
        console.log(this.msgInLS)
      }else{
      this.msgInLS.push(msgData);
      }
      this.storage.set(groupId,this.msgInLS);
    })
    */
  }

  getGroupMembers(groupId) {
    console.log('getting the members')
    //this.userGroupMember = this.afs.collection<any>(`/users_group/${userId}/groups/${groupId}/members`);
    
    this.userGroupMember = this.afs.collection<any>(`/users_group/${groupId}/members`);
    this.groupData = this.userGroupMember.snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        console.log(id)
        return { id, ...data }
      }))
    );
    //console.log(this.groupData)

    return this.groupData;
  }

  //groups of particular user 
  getGroupsOfUser(userId) {
    console.log('getting the user group')
    this.userGroup = this.afs.collection<any>(`/profiles/${userId}/groups`);

    this.groupData = this.userGroup.snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        console.log(id)
        console.log(data)
        return { id, ...data }
      }))
    );
    return this.groupData;
  }

  //getting the chat messges from database
  getMessages(userId, groupId) {
    this.userGroup = this.afs.collection<any>(`/profiles/${userId}/groups/${groupId}/chats`, ref =>
      ref.orderBy('time', 'asc'))
      this.groupData = this.userGroup.snapshotChanges().pipe(
        map(action => action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log(id)
          console.log(data)
          return { id, ...data }
        }))
      );
    return this.groupData;
  }

  deleteMessage(message , userId , groupId){
    console.log('deleting the message')
    this.messageDoc = this.afs.doc(`/profiles/${userId}/groups/${groupId}/chats/${message.id}`);
    this.messageDoc.delete();
  }
}

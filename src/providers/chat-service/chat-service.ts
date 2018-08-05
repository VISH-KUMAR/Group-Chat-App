
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
@Injectable()
export class ChatServiceProvider {

  channel:AngularFirestoreCollection<any>;
  group:Observable<any[]>;
  channels:any;
  messageDoc:AngularFirestoreDocument<any>;

  userId:string;
  constructor(
    private afs:AngularFirestore
  ) {
    console.log("consturctor")
    //this.afs.firestore
  
  }
  createPublicGroup(groupName:string){
    this.channel = this.afs.collection<any>('/group');
    this.group = this.channel.valueChanges();
    this.channel.add({Name:groupName});
  }
//   ionViewWillLoad(){
//     this.group = this.channel.valueChanges();
//     this.group.subscribe((data:any)=>{
//      console.log(data)
//      this.channels = data;
//    })
//   }
//   async getChannelList(){
//     return await this.channels;
//   }

  getChannelChatMessage(id:string){
    console.log(id)
  }
  
  sendChannelChatMessage(userName:string,channel , msg:string, userId:string){
    console.log(channel)
    this.afs.collection<any>(`/group/${channel.id}/members`)
    .snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        console.log(id)
        console.log(data)
        return { id, ...data }
      }))
    ).subscribe((data:any)=>{
      this.channel = this.afs.collection<any>(`/group/${channel.id}/members/${data.id}/chats`);
      this.channel.add({userName:userName,message:msg, uid:userId});
    })
  }

  deleteMessage(message, channelId){
    this.messageDoc = this.afs.doc(`/group/${channelId}/members/${this.userId}chats/${message.id}`)
    this.messageDoc.delete();
    console.log('message is deleted')
  }
  joinPublicGroup(userData,channel , userId){
    this.userId = userId;
    this.afs.collection<any>(`/group/${channel.id}/members`).doc(userId).set({userData:userData,isGroupMember:true});
    // this.channel.add({userData:userData,isGroupMember:true});

  }
 }

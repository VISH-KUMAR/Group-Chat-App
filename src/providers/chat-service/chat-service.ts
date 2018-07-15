
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Injectable()
export class ChatServiceProvider {

  channel:AngularFirestoreCollection<any>;
  group:Observable<any[]>;
  channels:any;
  messageDoc:AngularFirestoreDocument<any>;
  constructor(
    private afs:AngularFirestore
  ) {
    console.log("consturctor")
  }
  addGroup(groupName:string){
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
    this.channel = this.afs.collection<any>(`/group/${channel.id}/chats`);
    this.channel.add({userName:userName,message:msg, uid:userId});
  }

  deleteMessage(message, channelId){
    this.messageDoc = this.afs.doc(`/group/${channelId}/chats/${message.id}`)
    this.messageDoc.delete();
    console.log('message is deleted')
  }
 }

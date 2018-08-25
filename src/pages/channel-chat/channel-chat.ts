import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

///////// Models /////////
import { Channel, ChannelId } from '../../models/channels/Channel.interface';
import { ChannelMessages } from '../../models/channels/ChannelMessages.interface';

////////// Data Services ///////////
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { FlagServiceProvider } from '../../providers/flag-service/flag-service';

////////////////////////////////////////
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/////////////////
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: Channel;
  channelMessage: Observable<ChannelMessages[]>
  userName;
  userId: string;
  ////////////////////////////////////
  channel1: AngularFirestoreCollection<any>;
  messages: Observable<ChannelId[]>;
  ////////////////////////////
  flag:boolean=true;
  constructor(
    private navParams: NavParams,
    private chatService: ChatServiceProvider,
    private profileDataService: ProfileDataServiceProvider,
    private afs: AngularFirestore,
    private flagService: FlagServiceProvider,
    private storage:Storage
  ) {
    this.flagService.setChannelChatFlag();

    this.profileDataService.getUserData().subscribe(data => {
      this.userName = data;
      console.log(data)
    });

/////////////////////////////////////////////////////////////////////////
    ///////// Getting the userSataus that user is a member or not /////
     /*This has to be get and store from the database for future reference 
    if a user logout then this data will be wipe out but in the database usersattus
    will remain same so this is not so efficient */
    this.storage.get('groupJoinStatus').then(
      data=>{
        if(data != null ){
        data.forEach(element => {
          if(element.channelId == this.channel.id){
            if(element.isMember)
                this.flag = false;
             else
                this.flag = true;   
          }
          else{
            this.flag = true;
          }
        });
      }
      
    }
    )
    ////////////////////////////////////////////////////////


  }


  ionViewWillLoad() {
    this.channel = this.navParams.get('channel')
    this.userId = this.profileDataService.getUserId();

    console.log(this.channel);
    // this.channelMessage = this.chatService.getChannelChatMessage(this.channel.id)

    //////////////Getting the messages from firebase collection /////////////////
    this.channel1 = this.afs.collection<any>(`/group/${this.channel.id}/members/${this.userId}/chats`);
    this.messages = this.channel1.snapshotChanges().pipe(
      map(action => action.map(data => {
        const msg = data.payload.doc.data();
        const id = data.payload.doc.id;
        return { id, ...msg };
      }))
    );

  }

  ////////// Sending msg to chat service /////////////
  msgFromSendBox(event) {
    console.log(event)
    this.afs.collection<any>(`/group/${this.channel.id}/members`, ref => ref.where("isGroupMember", "==", true))
      .doc(this.userId).valueChanges().subscribe(
        (data: any) => {
          console.log(data)
          if (data.isGroupMember) {
            this.chatService.sendChannelChatMessage(this.userName.data.userName, this.channel, event, this.userId);
          }
        });
  }

  ///////// Deleting message/////////
  delete(message) {
    console.log(message);
    this.chatService.deleteMessage(message, this.channel.id);
  }
  groupJoinStatus=[];
  joinPublicGroup() {
    this.storage.get('groupJoinStatus').then(
      data=>{
        if(data === null){
          this.groupJoinStatus.push({
            channelId:this.channel.id,
            isMember:true
          })
          this.storage.set('groupJoinStatus',this.groupJoinStatus);
        }else{
        data.push({
            channelId:this.channel.id,
            isMember:true
          })
            ////// Setting the group join status for user s///// 
           this.storage.set('groupJoinStatus',data);
      }
    })
    this.flag = false;
    this.chatService.joinPublicGroup(this.userName.data, this.channel, this.userId)
  }
  

}

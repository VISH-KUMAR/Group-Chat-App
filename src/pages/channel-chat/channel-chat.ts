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

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: Channel;
  channelMessage: Observable<ChannelMessages[]>
  userName;
  userId:string;
  ////////////////////////////////////
  channel1: AngularFirestoreCollection<any>;
  messages: Observable<ChannelId[]>;
  ////////////////////////////
  constructor(
    private navParams: NavParams,
    private chatService: ChatServiceProvider,
    private profileDataService: ProfileDataServiceProvider,
    private afs: AngularFirestore,
    private flagService: FlagServiceProvider
  ) {
    this.profileDataService.getUserData().subscribe(data => {
      this.userName = data;
      console.log(data)
    });
  }


  ionViewWillLoad() {
    this.flagService.setChannelChatFlag();
    this.channel = this.navParams.get('channel')
    this.userId = this.profileDataService.getUserId();

    console.log(this.channel);
    // this.channelMessage = this.chatService.getChannelChatMessage(this.channel.id)

    //////////////Getting the messages from firebase collection /////////////////
    this.channel1 = this.afs.collection<any>(`/group/${this.channel.id}/chats`);
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
    this.chatService.sendChannelChatMessage(this.userName.data.userName, this.channel, event, this.userId);
  }

  ///////// Deleting message/////////
  delete(message) {
    console.log(message);
    this.chatService.deleteMessage(message, this.channel.id);
  }
}

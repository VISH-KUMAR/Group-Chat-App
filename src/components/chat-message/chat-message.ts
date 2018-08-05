import { Component, Input } from '@angular/core';

import { Message } from '../../models/message/message.interface';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';  
import { Observable } from 'rxjs';

///// Data services ///////
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { FlagServiceProvider } from '../../providers/flag-service/flag-service';

@Component({
  selector: 'chat-message',
  templateUrl: 'chat-message.html'
})
export class ChatMessageComponent {

  @Input() chatMessage: string[] = [];
  
  selectedUserId:string;
  userId:string;
  userChats: AngularFirestoreCollection<any>;
  chats: Observable<Message[]>;

  constructor(
    private afs: AngularFirestore,
    private profileDataService: ProfileDataServiceProvider,
    private flagService: FlagServiceProvider
  ) {
    this.flagService.setChatMessage();

    //here this.messages will give an observable so we need to subscribe it
    this.userId = this.profileDataService.getUserId();
    this.selectedUserId = this.profileDataService.getSelectedUser().id;

    //////////// Getting the messages from database ////////
    setTimeout(() => {
      this.userChats = afs.collection<Message>(`/profiles/${this.userId}/chats/${this.selectedUserId}/messages`,
        ref => ref.orderBy('timestamp', 'asc'));
      this.chats = this.userChats.snapshotChanges().pipe(
        map(action => action.map(data => {
          const msg = data.payload.doc.data() as Message;
          const id = data.payload.doc.id;
          console.log(data)
          return { id, ...msg };
        }))
      );
    }, 1000);

  }

  ////////////Deleting the message/////////////
  delete(message) {
    console.log(message)
    this.profileDataService.deleteMessage(message, this.userId, this.selectedUserId);
  }
}

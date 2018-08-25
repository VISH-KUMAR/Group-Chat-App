import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController,Loading } from 'ionic-angular';


import { Message } from '../../models/message/message.interface';

import { PopoverController,AlertController } from 'ionic-angular';
import { MainPagePopoverComponent } from '../../components/main-page-popover/main-page-popover';

import { ChatServiceProvider } from '../../providers/chat-service/chat-service';


import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';

import { Channel , ChannelId} from '../../models/channels/Channel.interface';
import { UserGroupChatServiceProvider } from '../../providers/user-group-chat-service/user-group-chat-service';
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';


import { FcmProvider } from '../../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage  {
  loader:Loading;

////////////////////////////////////
  channel:AngularFirestoreCollection<Channel>;
  users:AngularFirestoreCollection<any>;
  group:Observable<ChannelId[]>;
  channels:any;
  authenticatedUserId:string; 
////////////////////////////

  constructor(
    private navCtrl: NavController,
    private popoverCtrl:PopoverController,
    private alertCtrl: AlertController,
    private chatService: ChatServiceProvider,
    private loadingCtrl:LoadingController,
    private afs:AngularFirestore,
    private userGroupChatService:UserGroupChatServiceProvider,
    private modalCtrl:ModalController,
    private profileDataService:ProfileDataServiceProvider,
    private userGroupService:UserGroupChatServiceProvider,
    public fcm: FcmProvider,
    public toastCtrl: ToastController,
    private storage:Storage,
  ) {
    // setTimeout(() => {
    //   var a = firebase.auth().currentUser
    //   console.log(a.email);
    //   console.log(a.getIdToken().then(data=>{
    //     console.log(data);
    //   }));
    //   console.log(a.emailVerified);
    //   console.log(a.uid);
    //   console.log(a.getIdTokenResult());
    //   console.log(firebase.auth().onAuthStateChanged.toString)
    // }, 5000);

    //// getting the authenticated user from storage  //// 
    
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration:2000,
      dismissOnPageChange:true
    });
    this.loader.present();

    this.storage.get('authenticatedUser').then((val)=>{
      console.log(val);
      this.authenticatedUserId = val.uid;
      this.group = this.userGroupService.getGroupsOfUser(this.authenticatedUserId);
      this.profileDataService.getActiveUsers(val.uid).subscribe(
        (data)=>{
          console.log(data);
        }
      )
      console.log(this.authenticatedUserId)
    });

    
    
    
    //for set the no of groups on screen  
    setTimeout(()=>{
     // this.authenticatedUserId = this.profileDataService.getUserId()
  },3000);
   

  ////////// Getting the Public groups ///////
   /*
   this.channel = afs.collection<Channel>('/group');
   this.group = this.channel.snapshotChanges().pipe(
     map( action => action.map(a =>{
       const data = a.payload.doc.data() as Channel;
       const id = a.payload.doc.id;
       return { id , ...data}
      }))
    );
    this.group.subscribe((data:any)=>{
      console.log(data)
      data.forEach(group=>{
        console.log(group.id);
        afs.collection<any>(`/group/${group.id}/members`)
          .doc(this.authenticatedUserId).valueChanges().subscribe(
            data=>console.log(data)
          )
      })
    })*/
  }
  ionViewWillLoad(){

    // console.log(this.profileDataService.getAllUsers());
    // this.profileDataService.getAllUsers().subscribe(
    //   (data:any)=>{
    //     data.forEach(element => {
    //         console.log(element.id);
    //     });
    //   });
//////////////////////////////////////////
// this.users = this.afs.collection<any>(`/profiles/${ this.authenticatedUserId}/chats`);
//       this.group = this.users.stateChanges().pipe(
//         map(action => action.map(data => {
//           const msg = data.payload.doc.data() as any;
//           const id = data.payload.doc.id;
//           console.log(data)
//           return { id, ...msg };
//         }))
//       );
     // this.group.subscribe((data:any)=>console.log(data))
//     this.profileDataService.getActiveUsers(this.authenticatedUserId);
////////////////////////////////////////////



    

  }
/////// for notifications  ////////
  ionViewDidLoad(){
    
    //  // Get a FCM token
    // this.fcm.getToken()
     
    //   // Listen to incoming messages
    //   this.fcm.listenToNotifications().pipe(
    //     tap(msg => {
    //       // show a toast
    //       const toast = this.toastCtrl.create({
    //         message: msg.body,
    //         duration: 3000
    //       });
    //       toast.present();
    //     })
    //       ).subscribe()
    }
    
  
  
 
  ///// moving to selected the group  chat page /////
  selectedGroup(group){
    this.navCtrl.push('UserGroupChatPage',{group:group});
  }
  
  //showing the user photo on page in popover
  showPhoto(myEvent,userImg:string) {
    console.log(userImg)
    const popover = this.popoverCtrl.create('ProfilePhotoPopoverPage', 
    {
      userImage:userImg
    });
    popover.present( {
      ev:myEvent
    });
  }
  
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MainPagePopoverComponent);
    popover.present( {
      ev:myEvent
    });
  }

/////Going the chat page////////
  navigateToPage(user){
    this.navCtrl.push('ChatPage',{
      userDetails:user
    });
  }

////// Swipe ///////
  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(1);
    }
  }


  allUsers;

  ///////////////////////////////////
  // async getChannels(){
  //   //this.channels = await this.chatService.getChannelList();
  //   console.log(this.channels)
  // }
  //////////////////////////
  
  //selecting channel
  selectChannel(channel:any){
    //sending the channel info to chatchannelpage
    console.log(channel)
    this.navCtrl.push('ChannelChatPage',{channel:channel})
  }

  showAlertBox(){
    console.log('alertBox')
    let modal = this.modalCtrl.create('ModalPage');
    modal.present();
    
    /*
    this.alertCtrl.create({
      title:'Group Name',
      inputs:[{
        name:'channelName'
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
            this.userGroupChatService.addUserGroup(data.channelName)
        }
        }
      ]
    }).present();
    */
    }
  

}

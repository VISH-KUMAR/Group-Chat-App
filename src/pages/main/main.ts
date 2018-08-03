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


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage implements OnInit {
  loader:Loading;

////////////////////////////////////
  channel:AngularFirestoreCollection<Channel>;
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
    /*
    this.storage.get('loginStatus').then(loggedIn=>{
      if(loggedIn){
        this.storage.get('userData').then(data=>{
          
        })
      }
    })
    */

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration:1000,
      dismissOnPageChange:true
    });
    this.loader.present();
    
    
    //for set the no of groups on screen  
    setTimeout(()=>{
      this.authenticatedUserId = this.profileDataService.getUserId()
  },3000);
  this.group = this.userGroupService.getGroupsOfUser(this.authenticatedUserId);
   console.log(this.group)
   
   /*
   this.channel = afs.collection<Channel>('/group');
   this.group = this.channel.snapshotChanges().pipe(
     map( action => action.map(a =>{
       const data = a.payload.doc.data() as Channel;
       const id = a.payload.doc.id;
       return { id , ...data}
      }))
    );
    */
  }
  ionViewWillLoad(){
        //// getting the authenticated user from storage  //// 
        this.storage.get('authenticatedUser').then((val)=>{
          console.log(val);
          this.authenticatedUserId = val.uid;
          console.log(this.authenticatedUserId)
        }) 
  }
/////// for notifications  ////////
  ionViewDidLoad(){
    /*
     // Get a FCM token
     this.fcm.getToken()
     
    setTimeout(()=>{
      // Listen to incoming messages
      this.fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe()
    },3000)
    */
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
  ngOnInit(){
    console.log('ngoninit');
  }

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

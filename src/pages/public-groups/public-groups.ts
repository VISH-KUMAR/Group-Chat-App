import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, elementAt } from 'rxjs/operators';
import { Channel } from '../../models/channels/Channel.interface';

@IonicPage()
@Component({
  selector: 'page-public-groups',
  templateUrl: 'public-groups.html',
})
export class PublicGroupsPage {

  channel: AngularFirestoreCollection<any>;
  group: Observable<any[]>;
  showSearch: boolean = false;
  groupNames = [];
  groups;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private afs: AngularFirestore
  ) {
    ////////// Getting the Public groups ///////

    this.channel = afs.collection<Channel>('/group');
    this.group = this.channel.snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data() as Channel;
        const id = a.payload.doc.id;
        console.log(data);
        return { id, ...data }
      }))
    );
    this.initializeItems();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicGroupsPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ///// PUshing the selected pubic group chat page ////
  selectGroup(channel) {
    console.log(channel);
    this.navCtrl.push('ChannelChatPage', { channel: channel })
    this.viewCtrl.dismiss();

  }
  
  ////// show the serarch box ////
  searchUserPage() {
    console.log(this.groupNames);
    console.log('opening the search box')
    this.showSearch = !this.showSearch;
    console.log(this.showSearch)
    // this.content.scrollToTop();
    // this.navCtrl.push('SearchUserPage')
  }
  
  initializeItems(){
    this.group.subscribe((data: any) => {
      this.groups = data;
      console.log(this.groups);
      data.forEach(element => {
        this.groupNames.push(element.Name);
      });
    })
  }

  /////////// Getting the Serached users /////////////
  getUsers(ev: any) {
    console.log(this.groupNames)
    console.log(ev)
    const name = ev.target.value;

    // Reset items back to all of the items
     this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.groups = this.groups.Name.filter((item) => {
        console.log(item.toLowerCase().indexOf(val.toLowerCase()));
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    console.log(this.groups);
    // if(this.groupNames.length != 0){
    //   this.groupNames.forEach(userName=>{
    //     for (let i = 0; i < this.group1.length; i++) {
    //       if(this.group1[i].Name == userName){
    //         this.group1 = this.group1[i];
    //       }
    //     }
    //   });
    // }

  }
  ngOnDestroy() {
  }

}

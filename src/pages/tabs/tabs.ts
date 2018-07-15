import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabRoot1:string;
  tabRoot2:string;
  tabRoot3:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabRoot1 = 'MainPage';
    this.tabRoot2 = 'IboxPage';
    this.tabRoot3 = 'ProfilesPage';
  }
  swipe:number=0;
  swipeEvent(e){
    this.swipe++;
    console.log(this.swipe);
  }
}

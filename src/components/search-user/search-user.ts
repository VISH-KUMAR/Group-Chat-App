import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
import { Observable } from 'rxjs';

import { UserProfile } from '../../models/userProfile/userProfile.interface';

@Component({
  selector: 'search-user',
  templateUrl: 'search-user.html'
})
export class SearchUserComponent {

  name: string;
  users:Observable<UserProfile[]>;
  constructor(
    private navCtrl:NavController,
    private profileDataService:ProfileDataServiceProvider
  ) {

  }

  ///// searching user ////
  searchUser(name:string){
    console.log(name)
    if(name != ''){
      this.users = this.profileDataService.searchUser(name);
      console.log(this.users)
    }
  }
  /// Moving to Selected users Page /////
  navigateToPage(user){
    console.log(user)
    this.profileDataService.setSelectedUser(user);
    this.navCtrl.push('ChatPage',{
      userDetails:user
    });
    
  }
}

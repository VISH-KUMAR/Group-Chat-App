import { Component, OnInit } from '@angular/core';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { ProfileDataServiceProvider } from '../../providers/profile-data-service/profile-data-service';
@Component({
  selector: 'online-users',
  templateUrl: 'online-users.html'
})
export class OnlineUsersComponent implements OnInit {

  

  constructor(
    private authService:AuthServiceProvider,
    private profileDataService:ProfileDataServiceProvider
  ) {
   
  }
  ngOnInit(){
    this.setUserOnline();
  }
  setUserOnline(){
    //get authenticated user
    this.authService.getAuthenticatedUser().subscribe(data=>{
      //calling the service that sets the user online within the firebase
      this.profileDataService.setUserOnline(data);
    })
  }
}

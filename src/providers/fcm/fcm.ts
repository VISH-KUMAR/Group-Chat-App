import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
 import { ProfileDataServiceProvider } from '../profile-data-service/profile-data-service';

@Injectable()
export class FcmProvider {
  userId:string;
  constructor(  
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    private profileDataService:ProfileDataServiceProvider
  ) {
    //this.userId=this.profileDataService.getUserId();
  }

  // Get permission from the user
   getToken() {
    let token;
    this.firebaseNative.grantPermission();
  if (this.platform.is('android')) {
    token =  this.firebaseNative.getToken()
    console.log(token);
    alert(token);
  } 
  console.log('getting the token')
  // if (this.platform.is('ios')) {
  //   token = await this.firebaseNative.getToken();
  //   await this.firebaseNative.grantPermission();
  // } 
  
  return this.saveTokenToFirestore(token)
   }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;
    console.log('saving the token to firebase')
    const devicesRef = this.afs.collection('devices')
    const docData = { 
      token,
      userId: 'userId',
    }
    alert(docData.token.token+"  "+docData.userId);
    return devicesRef.doc(token).set(docData)
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    console.log('listening the notifictioan')
    return this.firebaseNative.onNotificationOpen()
  }

}

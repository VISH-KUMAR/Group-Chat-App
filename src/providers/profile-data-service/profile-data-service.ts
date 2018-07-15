//this service will save the user Profile and user one on one chat  to database

import { Injectable, OnDestroy } from '@angular/core';

////////////////////////////////////
//ANGULAR FIRE STORE
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs/Subscription';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

///// this will be the firebase.user.interface ////
import  { User } from 'firebase/app';
/////// user Profile interface ////////
import { UserProfile } from '../../models/userProfile/userProfile.interface';


import { Storage } from '@ionic/storage';

@Injectable()
export class ProfileDataServiceProvider implements OnDestroy {
  userProfile;
  userProfileobject:AngularFirestoreCollection<UserProfile>
  profiles:Observable<UserProfile[]>;
  //afs is the reference which is used to save and get data from the firestore from different nodes
  user:User;
  authenticatedUser$:Subscription;
  authenticatedUser:User;
  messageDoc:AngularFirestoreDocument<any>;

  constructor(
    private afs:AngularFirestore,
    private authService:AuthServiceProvider,
    private storage: Storage
  ) {
    //////// getting the logged in user data //////////
    this.authenticatedUser$ = this.authService.getAuthenticatedUser().subscribe((user:User)=>{
      this.authenticatedUser = user;
      console.log(this.authenticatedUser);
    });

    console.log('this is profile data service constructor')
    this.userProfileobject = afs.collection<UserProfile>('/profiles');
    this.profiles = this.userProfileobject.snapshotChanges().pipe(
      map( action => action.map(a =>{
        const data = a.payload.doc.data() as UserProfile;
        const id = a.payload.doc.id;
        return { id , ...data}
       }))
     ); 
  }
  
  /////// sending the data to database while persisting the id as the Authenticated userId //////
  setData(data){
    this.userProfile = data;
     // Persist a document id and set the profile data to that id only(ie to logged user)
    const id = this.authenticatedUser.uid;
    console.log(this.authenticatedUser.email) 
    const profile = { email:this.authenticatedUser.email, data}

    /// setData in local storage////
   // this.storage.set(id, profile);
    /// setData on firebase ////
    this.userProfileobject.doc(id).set(profile);
  }

  /////// Authenticated  user data  //////////
  getUserData(){
    const id = this.authenticatedUser.uid;
    console.log( this.userProfileobject.doc(id).valueChanges())
    return this.userProfileobject.doc(id).valueChanges();
     
  }
  getUserData1(){
    return {user:this.userProfile, email:this.authenticatedUser.email , id:this.authenticatedUser.uid};
  }

  ////////// Authenticated User ///////////
  getUser(){
    console.log(this.authenticatedUser)
    return this.authenticatedUser;
  }
  //////// Getting Authenticated User Id //////////
  getUserId(){
    return this.authenticatedUser.uid;
  }
  
  //////// Getting all the user from fireStore ////////
  getAllUsers(){
    console.log('getting all the users method in profile data service')
    this.userProfileobject = this.afs.collection<UserProfile>('/profiles');
    this.profiles = this.userProfileobject.snapshotChanges().pipe(
      map( action => action.map(a =>{
        const data = a.payload.doc.data() as UserProfile;
        const id = a.payload.doc.id;
        return { id , ...data}
       }))
     );
    return this.profiles;
  }

  setUserOnline(profile){
  }

  
  //// getting Selected user/////
  selectedUser;
  setSelectedUser(user){
    this.selectedUser = user; 
  }
  getSelectedUser(){
    return this.selectedUser;
  }

  /////// Search User ///////////
  searchUser(firstName:string){
    console.log(firstName)
    this.userProfileobject = this.afs.collection<UserProfile>('/profiles',
           ref => ref.where('data.firstName','==',firstName));
    this.profiles = this.userProfileobject.snapshotChanges().pipe(
      map( action => action.map(a =>{
        const data = a.payload.doc.data() as UserProfile;
        const id = a.payload.doc.id;
        return { id , ...data}
       }))
     );
    return this.profiles;
  }

  //////// Sending the msg to firebase /////////
  userProfileobject1:AngularFirestoreCollection<any>
  sendChatMessage(userId, data:string , user){
    console.log(data)
    let d = new Date();
    let datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
      d.getHours() + ":" + d.getMinutes() +":"+d.getSeconds();
    this.userProfileobject1 = this.afs.collection<any>(`/profiles/${user.id}/chats/${userId}/messages`);
    this.userProfileobject1.add({message:data , messageFrom:userId , time:datestring , timestamp:d}); 

    this.userProfileobject1 = this.afs.collection<any>(`/profiles/${userId}/chats/${user.id}/messages`)
    this.userProfileobject1.add({message:data, messageTo:user.id , time:datestring , timestamp:d});
  }

  /////////// Deleting a message from user chat //////////
  deleteMessage(message , userId , selectedUserId){
    this.messageDoc = this.afs.doc(`/profiles/${userId}/chats/${selectedUserId}/messages/${message.id}`);
    this.messageDoc.delete();
  }

  ngOnDestroy(){
    this.authenticatedUser$.unsubscribe();
  } 
}

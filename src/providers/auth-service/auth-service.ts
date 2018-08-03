//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { Account } from '../../models/registerAccount/account.interface';
 
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { Storage } from '@ionic/storage';
@Injectable()
export class AuthServiceProvider {

  constructor(
    private afAuth:AngularFireAuth,
    public googlePlus:GooglePlus,
    private storage:Storage
  ) {
    
  }

  ////// register /////
   createUserWithEmailAndPassword(account:Account){
    try{
      console.log(account)
      return <any>{
        result: this.afAuth.auth.createUserWithEmailAndPassword(account.email , account.password)
      }
    }
    catch(e){
      return <any>{
        error:e
      }
    }
  }

  /////// sign in  ////// 
   signInWithEmailAndPassword(account:Account){
    try{
      console.log(this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password))
      return<any> {
        result:  this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      }
    }
    catch(e){
      console.log(e);
      return <any>{
        error:e
      }
    }
  }

  getAuthenticatedUser(){
    //this returns the all the data about the user such email, name and userName 
    return this.afAuth.authState;
  }

  signOut(){
    
    this.afAuth.auth.signOut();
    // this.storage.set('loginStatus',false);
    // this.storage.remove('userCredentials');
    this.storage.clear();
    return true;
  }

  loginWithGoogle(){
    console.log('asdfasdf')
    this.googlePlus.login({
      'webClientId':'1023118639001-e361mahqj7qoapu553o1nkujcem91ora.apps.googleusercontent.com',
      'offline':true
    }).then(res =>{
      firebase.auth().signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(res.idToken))
            .then(suc =>{
              alert('LOGIN SUCCESSFUL')
              return true;
            }).catch(err=>{
              alert('LOGIN UNSUCCESSFUL')
              return false;
            })
    })
  }
  
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';

//importing firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
//import { AngularFireOfflineModule } from 'angularfire2-offline';


import { MainPagePopoverComponent } from '../components/main-page-popover/main-page-popover';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Push } from '@ionic-native/push';

import { MyApp } from './app.component';
import { firebaseConfig } from './config';
import { ProfileDataServiceProvider } from '../providers/profile-data-service/profile-data-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { UserGroupChatServiceProvider } from '../providers/user-group-chat-service/user-group-chat-service';
import { FlagServiceProvider } from '../providers/flag-service/flag-service';
import { IonicStorageModule } from '@ionic/storage';
import { ImghandlerProvider } from '../providers/image-handler/image-handler';
import { FcmProvider } from '../providers/fcm/fcm';

firebase.initializeApp(firebaseConfig.config);

@NgModule({
  declarations: [
    MyApp,
    MainPagePopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig.config),
    IonicStorageModule.forRoot(),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  //  AngularFireOfflineModule,
       // Just like that, you're offline enabled!
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPagePopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    ProfileDataServiceProvider,
    AuthServiceProvider,
    ChatServiceProvider,
    UserGroupChatServiceProvider,
    FlagServiceProvider,
    GooglePlus,
    File,
    FilePath,
    FileChooser,
    ImghandlerProvider,
    Firebase,
    FcmProvider,
    Push
  ]
})
export class AppModule {}

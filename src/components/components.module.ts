import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ChatMessageComponent } from './chat-message/chat-message';
import { SendMessageBoxComponent } from './send-message-box/send-message-box';
import { ChatPageNavbarComponent } from './chat-page-navbar/chat-page-navbar';
import { OnlineUsersComponent } from './online-users/online-users';
import { SearchUserComponent } from './search-user/search-user';
//import { MainPagePopoverComponent } from './main-page-popover/main-page-popover';



@NgModule({
	declarations: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent,
        ChatMessageComponent,
        SendMessageBoxComponent,
        ChatPageNavbarComponent,
        OnlineUsersComponent,
        SearchUserComponent,
    ],
	imports: [
        IonicModule
    ],
    entryComponents: [
  
      ],
	exports: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent,
        ChatMessageComponent,
        SendMessageBoxComponent,
        ChatPageNavbarComponent,
        OnlineUsersComponent,
        SearchUserComponent,
    ]
})
export class ComponentsModule {}

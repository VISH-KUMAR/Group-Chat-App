import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserGroupChatPage } from './user-group-chat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserGroupChatPage,
  ],
  imports: [
    IonicPageModule.forChild(UserGroupChatPage),
    ComponentsModule
  ],
})
export class UserGroupChatPageModule {}

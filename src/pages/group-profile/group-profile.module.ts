import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupProfilePage } from './group-profile';

@NgModule({
  declarations: [
    GroupProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(GroupProfilePage),
  ],
})
export class GroupProfilePageModule {}

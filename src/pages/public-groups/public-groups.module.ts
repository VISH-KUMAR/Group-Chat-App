import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicGroupsPage } from './public-groups';

@NgModule({
  declarations: [
    PublicGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicGroupsPage),
  ],
})
export class PublicGroupsPageModule {}

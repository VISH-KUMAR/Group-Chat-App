import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePhotoPopoverPage } from './profile-photo-popover';

@NgModule({
  declarations: [
    ProfilePhotoPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePhotoPopoverPage),
  ],
})
export class ProfilePhotoPopoverPageModule {}

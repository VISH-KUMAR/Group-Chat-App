import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IboxPage } from './ibox';

@NgModule({
  declarations: [
    IboxPage,
  ],
  imports: [
    IonicPageModule.forChild(IboxPage),
  ],
})
export class IboxPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { ComponentsModule } from '../../components/components.module';

//importing the authenticaiton module
//import { AngularFireAuthModule } from 'angularfire2/auth';
//we need this to app.module because of using the provider

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    ComponentsModule
  ],
})
export class LoginPageModule {}

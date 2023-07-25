import { SharemoduleModule } from './../sharemodule/sharemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    LoginPageRoutingModule,
    SharemoduleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage],
  // providers:[
    
  // ]
})
export class LoginPageModule {}

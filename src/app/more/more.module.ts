import { RuleComponent } from './rule/rule.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SharemoduleModule } from './../sharemodule/sharemodule.module';
import { AddSupportComponent } from './supports/add-support/add-support.component';
import { DetailComponent } from './supports/detail/detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorePageRoutingModule } from './more-routing.module';

import { MorePage } from './more.page';
import { SupportsComponent } from './supports/supports.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorePageRoutingModule,
    ReactiveFormsModule,
    SharemoduleModule
  ],
  declarations: [
    MorePage,
    SupportsComponent,
    DetailComponent,
    AddSupportComponent,
    AboutusComponent,
    RuleComponent
  
  ]
})
export class MorePageModule {}

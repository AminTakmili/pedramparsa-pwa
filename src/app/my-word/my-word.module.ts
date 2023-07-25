import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyWordPageRoutingModule } from './my-word-routing.module';

import { MyWordPage } from './my-word.page';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyWordPageRoutingModule,
    SharemoduleModule,

    SwiperModule
  ],
  declarations: [MyWordPage]
})
export class MyWordPageModule {}

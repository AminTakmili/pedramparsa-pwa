import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConjugateAdjectivePageRoutingModule } from './conjugate-adjective-routing.module';

import { ConjugateAdjectivePage } from './conjugate-adjective.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConjugateAdjectivePageRoutingModule
  ],
  declarations: [ConjugateAdjectivePage]
})
export class ConjugateAdjectivePageModule {}

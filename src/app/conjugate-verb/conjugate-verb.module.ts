import { SharemoduleModule } from './../sharemodule/sharemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConjugateVerbPageRoutingModule } from './conjugate-verb-routing.module';

import { ConjugateVerbPage } from './conjugate-verb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConjugateVerbPageRoutingModule,
    SharemoduleModule
  ],
  declarations: [ConjugateVerbPage]
})
export class ConjugateVerbPageModule {}

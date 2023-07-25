import { TextbookDetailComponent } from './textbook-detail/textbook-detail.component';
import { TextbookSectionComponent } from './textbook-section/textbook-section.component';
import { SharemoduleModule } from './../sharemodule/sharemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextbookPageRoutingModule } from './textbook-routing.module';

import { TextbookPage } from './textbook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextbookPageRoutingModule,
    SharemoduleModule
  ],
  declarations: [TextbookPage,TextbookSectionComponent,TextbookDetailComponent]
})
export class TextbookPageModule {}

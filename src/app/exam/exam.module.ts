import { SharemoduleModule } from './../sharemodule/sharemodule.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ExamtextComponent } from './examtext/examtext.component';
import { ExamtypeComponent } from './examtype/examtype.component';
import { SwiperModule } from 'swiper/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamPageRoutingModule } from './exam-routing.module';

import { ExamPage } from './exam.page';
import { EmamSectionComponent } from './emam-section/emam-section.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamPageRoutingModule,
    SwiperModule,
    PdfViewerModule,
    SharemoduleModule
  ],
  declarations: [
    ExamPage,
    ExamtypeComponent,
    ExamtextComponent,
    EmamSectionComponent
  ]
})
export class ExamPageModule {}

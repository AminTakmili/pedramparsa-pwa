import { DictationvocabularyComponent } from './dictationvocabulary/dictationvocabulary.component';
import { SwiperModule } from 'swiper/angular';
import { ReviewvocabularyComponent } from './reviewvocabulary/Reviewvocabulary.component';
import { VocabularybookdetailsComponent } from './vocabularybookdetails/vocabularybookdetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocabularyPageRoutingModule } from './vocabulary-routing.module';

import { VocabularyPage } from './vocabulary.page';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { VocabularybooksectionComponent } from './vocabularybooksection/vocabularybooksection.component';
import { VocabularycardComponent } from './vocabularycard/vocabularycard.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocabularyPageRoutingModule,
    SharemoduleModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    }),
    SwiperModule,
  ],
  declarations: [
    VocabularyPage,
    VocabularybooksectionComponent,
    VocabularybookdetailsComponent,
    ReviewvocabularyComponent,
   VocabularycardComponent,
   DictationvocabularyComponent
  ]
})
export class VocabularyPageModule {}

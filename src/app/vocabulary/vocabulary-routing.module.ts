import { DictationvocabularyComponent } from './dictationvocabulary/dictationvocabulary.component';
import { VocabularycardComponent } from './vocabularycard/vocabularycard.component';
import { ReviewvocabularyComponent } from './reviewvocabulary/Reviewvocabulary.component';
import { VocabularybookdetailsComponent } from './vocabularybookdetails/vocabularybookdetails.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocabularyPage } from './vocabulary.page';
import { VocabularybooksectionComponent } from './vocabularybooksection/vocabularybooksection.component';

const routes: Routes = [
  {
    path: '',
    component: VocabularyPage
  },
  {
    path: ':id',
    component: VocabularybooksectionComponent
  },
  {
    path: ':id/:detailsid',
    component: VocabularybookdetailsComponent
  }
  ,
  {
    path: ':id/:detailsid/verb',
    component: ReviewvocabularyComponent
  }
  ,
  {
    path: ':id/:detailsid/name',
    component: ReviewvocabularyComponent
  }
  ,
  {
    path: ':id/:detailsid/review',
    component: ReviewvocabularyComponent
  }
  ,
  {
    path: ':id/:detailsid/card/:re',
    component: VocabularycardComponent
  }
  ,
  {
    path: ':id/:detailsid/dictation',
    component: DictationvocabularyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocabularyPageRoutingModule {}

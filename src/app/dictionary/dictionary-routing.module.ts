import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictionaryPage } from './dictionary.page';

const routes: Routes = [
  {
    path: '',
    component: DictionaryPage,
    
  },
  {
    path: 'conjugateVerb',
    redirectTo:''
  },
  {
    path: 'conjugateVerb/:word_id',
    loadChildren: () => import('../conjugate-verb/conjugate-verb.module').then( m => m.ConjugateVerbPageModule)
  },
  {
    path: 'conjugateAdjective/:word_id',
    loadChildren: () => import('../conjugate-adjective/conjugate-adjective.module').then( m => m.ConjugateAdjectivePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryPageRoutingModule {}

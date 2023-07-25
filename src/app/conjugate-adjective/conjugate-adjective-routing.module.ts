import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConjugateAdjectivePage } from './conjugate-adjective.page';

const routes: Routes = [
  {
    path: '',
    component: ConjugateAdjectivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConjugateAdjectivePageRoutingModule {}

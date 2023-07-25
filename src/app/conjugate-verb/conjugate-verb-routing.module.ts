import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConjugateVerbPage } from './conjugate-verb.page';

const routes: Routes = [
  {
    path: '',
    component: ConjugateVerbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConjugateVerbPageRoutingModule {}

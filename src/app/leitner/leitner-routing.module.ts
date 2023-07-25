import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeitnerPage } from './leitner.page';

const routes: Routes = [
  {
    path: '',
    component: LeitnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeitnerPageRoutingModule {}
